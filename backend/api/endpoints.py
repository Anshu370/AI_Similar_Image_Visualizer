from fastapi import APIRouter, UploadFile, File, HTTPException, status
from http import HTTPStatus
import utility.file_handler as fh
import utility.Mongo_database as similar_image
import utility.CLIP_utils as embd
import utility.Gemini_utils as gemini


router = APIRouter()

ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg"]

@router.post("/api/match")
async def match_image(image: UploadFile = File(...)):
    # Validate the uploaded file is an image
    if image.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type: {image.content_type}. Only image files are allowed."
        )

    PIL_image = await fh.get_file(file=image)

    try:
        metadata = await gemini.extract_metadata_with_gemini(PIL_image)
        embedding = await embd.get_clip_embedding(PIL_image)
        cosine_similarity_report = await similar_image.get_similar_products(embedding)

        return {
            "status_code": HTTPStatus.OK,
            "Image metadata": {"metadata":metadata, "embedding": embedding},
            "Result": {"Content": cosine_similarity_report["similar_products"], "Filter_brand":cosine_similarity_report["filter_brand"]},
            "message": "Image processed and metadata extracted successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred while processing the image: {str(e)}"
        )

