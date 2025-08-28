from fastapi import APIRouter, UploadFile, Form

router = APIRouter()


@router.post("api/match")
async def match_image(image: UploadFile, source: str = Form(...)):
    return {"message": "Matching the Image"}

