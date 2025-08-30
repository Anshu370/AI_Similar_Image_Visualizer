from PIL import Image
from fastapi import UploadFile, File
from fastapi import APIRouter, UploadFile, Form
from transformers import CLIPProcessor, CLIPModel
import torch

router = APIRouter()

def get_file(file: UploadFile = File(...)) -> Image.Image:
    if file:
        image = Image.open(file.file).convert("RGB")
    else:
        raise ValueError("No image file or URL provided.")
    return image

clip_model = CLIPModel.from_pretrained("openai/clip-vit-base-patch32")
clip_processor = CLIPProcessor.from_pretrained("openai/clip-vit-base-patch32")


@router.post("api/match")
async def match_image(image: UploadFile = File(...)):
    image = get_file(image)
    inputs = clip_processor(images=image, return_tensors="pt")
    with torch.no_grad():
        outputs = clip_model.get_image_features(**inputs)
    embedding = outputs[0].numpy()
    return {"message": "Matching the Image", "embedding": embedding}

