import os
from google import genai
from PIL import Image
import json
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("GEMINI_API_KEY")

client = genai.Client(api_key=api_key)

def extract_metadata_with_gemini(image: Image.Image):
    try:
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[image,
                      """You are an AI assistant for an e-commerce visual search engine.
Given an image of a product, return only a JSON object with the following fields:

- name
- category (e.g. bag, footwear, dress, electronics)
- tags (5 words describing material, gender, style, color, etc.)
- color (as a color name, not code)
- brand (if visible, else "unknown")
- target_audience ("Men", "Women", "kids", "Unisex")

Return ONLY valid JSON. No markdown, no explanation."""]
        )
        text = response.text
        return json.loads(text)
    except Exception as e:
        print(f"[Gemini Error] {e}")
        return {
            "name": "unknown",
            "category": "unknown",
            "tags": [],
            "color": "unknown",
            "brand": "unknown",
            "size": "unknown",
            "target_audience": "unknown"
        }