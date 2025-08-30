from PIL import Image
from fastapi import UploadFile
from fastapi import APIRouter, UploadFile, Form
import CLIP_utils as EMBD
router = APIRouter()

def get_file(file: [UploadFile] = None) -> Image.Image:
    if file:
        image = Image.open(file.file).convert("RGB")
    else:
        raise ValueError("No image file or URL provided.")
    return image


@router.post("api/match")
async def match_image(image: UploadFile, source: str = Form(...)):
    image = get_file(image)
    embedding = EMBD.get_clip_embedding(image)
    return {"message": "Matching the Image", "embedding": embedding}

