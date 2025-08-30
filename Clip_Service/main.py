from fastapi import FastAPI, UploadFile, File
from transformers import CLIPProcessor, CLIPModel
from PIL import Image
import torch

app = FastAPI()

clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")

@app.post("/embed")
async def get_embedding(image: UploadFile = File(...)):
    img = Image.open(image.file).convert("RGB")
    inputs = clip_processor(images=img, return_tensors="pt")
    with torch.no_grad():
        embedding = clip_model.get_image_features(**inputs)
        embedding = embedding / embedding.norm(p=2, dim=-1)
    return {"embedding": embedding.squeeze().tolist()}
