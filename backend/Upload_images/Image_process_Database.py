import os
import json
import torch
import re
import cloudinary
import cloudinary.uploader
import numpy as np
from pymongo import MongoClient
from dotenv import load_dotenv
from transformers import CLIPProcessor, CLIPModel
import base64
from google import genai
from PIL import Image


# Load .env
load_dotenv()

# Environment variables
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
MONGO_URI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")
MONGO_COLLECTION = os.getenv("MONGO_COLLECTION")
CLOUD_NAME = os.getenv("CLOUDINARY_CLOUD_NAME")
API_KEY = os.getenv("CLOUDINARY_API_KEY")
API_SECRET = os.getenv("CLOUDINARY_API_SECRET")

# Setup Cloudinary
cloudinary.config(
    cloud_name=CLOUD_NAME,
    api_key=API_KEY,
    api_secret=API_SECRET
)

# Setup MongoDB
mongo_client = MongoClient(MONGO_URI)
collection = mongo_client[MONGO_DB][MONGO_COLLECTION]

# Load CLIP Model
clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

# Constants
IMAGE_FOLDER = "images"
CLOUDINARY_FOLDER = "Image visualizer images"

api_key = os.getenv("GEMINI_API_KEY")

# ✅ Initialize Gemini client
client = genai.Client(api_key=api_key)


def extract_metadata_with_gemini(image_path):
    try:
        image = Image.open(image_path).convert("RGB")

        prompt = """
You are an AI assistant for an e-commerce visual search engine.
Given an image of a product, return only a JSON object with the following fields:

- name
- category (e.g. bag, footwear, dress, electronics)
- tags (5 words describing material, gender, style, color, etc.)
- color (as a color name, not code)
- brand (if visible, else "unknown")
- target_audience ("Men", "Women", "kids", "Unisex")

Return ONLY valid JSON. No markdown, no explanation.
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[image, prompt],
        )

        # Use regex to extract JSON from any wrapping text/markdown
        match = re.search(r"\{.*\}", response.text, re.DOTALL)
        if match:
            json_str = match.group(0)
            return json.loads(json_str)

        raise ValueError("No JSON object found in Gemini response.")

    except Exception as e:
        print(f"[❌] Gemini API error for {image_path}: {e}")
        return {
            "name": os.path.basename(image_path).split('.')[0],
            "category": "unknown",
            "tags": [],
            "color": "unknown",
            "brand": "unknown"
        }

def upload_image_to_cloudinary(image_path):
    result = cloudinary.uploader.upload(
        image_path,
        folder=CLOUDINARY_FOLDER,
        use_filename=True,
        unique_filename=False,
        overwrite=True
    )
    return result["secure_url"]


def get_clip_embedding(image_path):
    image = Image.open(image_path).convert("RGB")
    inputs = clip_processor(images=image, return_tensors="pt")
    with torch.no_grad():
        embedding = clip_model.get_image_features(**inputs)
        embedding = embedding / embedding.norm(p=2, dim=-1)
    return embedding.squeeze().tolist()


def process_all_images():
    for file in os.listdir(IMAGE_FOLDER):
        if file.lower().endswith((".jpg", ".jpeg", ".png")):
            image_path = os.path.join(IMAGE_FOLDER, file)
            print(f"\n📸 Processing {file}...")

            # Step 1: Gemini metadata
            meta = extract_metadata_with_gemini(image_path)
            print(f"  🧠 Metadata: {meta}")

            # Step 2: Upload to Cloudinary
            image_url = upload_image_to_cloudinary(image_path)
            print(f"  ☁️ Uploaded to Cloudinary: {image_url}")

            # Step 3: CLIP embedding
            embedding = get_clip_embedding(image_path)
            print(f"  🔗 CLIP Embedding extracted.")

            # Step 4: Combine and store in MongoDB
            document = {
                "name": meta["name"],
                "category": meta["category"],
                "tags": meta["tags"],
                "brand": meta["brand"],
                "color": meta["color"],
                "image_url": image_url,
                "embedding": embedding
            }

            collection.insert_one(document)
            print("  ✅ Stored in MongoDB.")

if __name__ == "__main__":
    process_all_images()
