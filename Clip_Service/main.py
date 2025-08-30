from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
from PIL import Image
from fastapi import UploadFile, File
from transformers import CLIPProcessor, CLIPModel
import torch

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get('/')
def main():
    return {"message": "Image_Visualizer MicroService"}

clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")


@app.post("/api/match")
async def match_image(file: UploadFile = File(...)):
    if file:
        image = Image.open(file.file).convert("RGB")
    else:
        raise ValueError("No image file or URL provided.")
    
    inputs = clip_processor(images=image, return_tensors="pt")

    with torch.no_grad():
        outputs = clip_model.get_image_features(**inputs)

    embedding = outputs[0].numpy()

    return {"message": "Matching the Image", "embedding": embedding.tolist()}