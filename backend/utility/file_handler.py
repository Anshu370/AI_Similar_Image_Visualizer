from PIL import Image
from io import BytesIO
import requests
from fastapi import UploadFile
from typing import Optional

async def get_file(file: Optional[UploadFile] = None, url: Optional[str] = None) -> Image.Image:
    if file:
        image = Image.open(file.file).convert("RGB")
    elif url:
        response = requests.get(url)
        image = Image.open(BytesIO(response.content)).convert("RGB")
    else:
        raise ValueError("No image file or URL provided.")
    return image