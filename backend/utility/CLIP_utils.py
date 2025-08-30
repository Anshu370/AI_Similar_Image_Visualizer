import requests
from fastapi import UploadFile
from config import Embed_url
async def get_clip_embedding_from_service(image_file: UploadFile) -> list:
    # Reset file pointer to start
    image_file.file.seek(0)

    response = requests.post(
        f"{Embed_url}/embed",  # Replace with actual URL
        files={
            "image": (image_file.filename, image_file.file, image_file.content_type)
        }
    )

    response.raise_for_status()  # Raise an exception for HTTP error responses
    return response.json()["embedding"]
