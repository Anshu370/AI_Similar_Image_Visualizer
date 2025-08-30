from dotenv import load_dotenv
import os

load_dotenv()

MongoURI = os.getenv("MONGO_URI")
MONGO_DB = os.getenv("MONGO_DB")
MONGO_COLLECTION = os.getenv("MONGO_COLLECTION")

GEMINI_KEY = os.getenv("GEMINI_API_KEY")

Embed_url=os.getenv("EMBED_URL")
