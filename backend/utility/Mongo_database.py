from pymongo import MongoClient
import numpy as np
import config

client = MongoClient(config.MongoURI)
db = client[config.MONGO_DB]
collection = db[config.MONGO_COLLECTION]

# Custom Cosine Similarity (Sklearn uses high memory at a time of hosting)
def cosine_similarity(query_embedding, embeddings):
    query = np.array(query_embedding)
    embeddings = np.array(embeddings)

    query_norm = np.linalg.norm(query)
    embeddings_norm = np.linalg.norm(embeddings, axis=1)

    dot_products = embeddings @ query
    similarities = dot_products / (embeddings_norm * query_norm)

    return similarities.tolist()

async def get_similar_products(query_embedding):

    # Fetch relevant fields from all documents
    products = list(collection.find({}, {
        "_id": 1,
        "embedding": 1,
        "name": 1,
        "category": 1,
        "image_url": 1,
        "tags": 1,
        "target_audience": 1,
        "brand": 1
    }))

    # Prepare data
    ids = [str(p["_id"]) for p in products]
    embeddings = np.array([p["embedding"] for p in products])

    # Cosine similarity
    similarities = cosine_similarity(query_embedding, embeddings)

    results = []
    brand_set = set()

    for i, score in enumerate(similarities):
        score_float = round(float(score), 2)

        # Add product with full details
        results.append({
            "id": ids[i],
            "similarity": score_float,
            "name": products[i].get("name", "Unknown"),
            "category": products[i].get("category", "Unknown"),
            "image_url": products[i].get("image_url", ""),
            "tags": products[i].get("tags", []),
            "target_audience": products[i].get("target_audience", "unisex"),
            "brand": products[i].get("brand", "unknown")
        })

        # Collect tags for frontend filtering if similarity >= 0.5
        if score_float >= 0.7:
            brand = products[i].get("brand", "")
            if isinstance(brand, str):
                brand = brand.strip().lower()
                if brand and brand != "unknown":
                    brand_set.add(brand)

    # Sort products by similarity descending
    results.sort(key=lambda x: x["similarity"], reverse=True)

    return {
        "similar_products": results,
        "filter_brand": list(brand_set)
    }
