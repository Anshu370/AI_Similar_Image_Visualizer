from pymongo import MongoClient
from bson import ObjectId
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
import os

client = MongoClient(os.getenv("MONGO_URI", "mongodb://localhost:27017/"))
db = client["visual_product_matcher"]
collection = db["products"]

def get_similar_products(query_embedding, threshold=0.5):
    products = list(collection.find({}, {"_id": 1, "embedding": 1}))
    ids = [str(p["_id"]) for p in products]
    embeddings = np.array([p["embedding"] for p in products])
    similarities = cosine_similarity([query_embedding], embeddings)[0]
    results = []
    for i, score in enumerate(similarities):
        if score >= threshold:
            results.append({"id": ids[i], "similarity": round(float(score), 2)})
    results.sort(key=lambda x: x["similarity"], reverse=True)
    return results

