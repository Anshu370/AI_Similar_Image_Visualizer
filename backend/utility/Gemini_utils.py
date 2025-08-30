import json
import re
from google import genai
from config import GEMINI_KEY

client = genai.Client(api_key=GEMINI_KEY)

async def extract_metadata_with_gemini(image):
    try:
        prompt = """
You are an AI assistant for an e-commerce visual search engine.
Given an image of a product, return only a JSON object with the following fields:

- name
- category (e.g. bag, footwear, dress, electronics)
- tags (5 words describing material, gender, style, color, etc.)
- color (as a color name, not code)
- brand (if visible, else "unknown")
- target_audience ("Men", "Women", "kids", "Unisex")
- price (If you can found else "unknown")

Return ONLY valid JSON. No markdown, no explanation.
        """

        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=[image, prompt],
        )

        # Use regex to extract JSON from any wrapping text/markdown
        match = re.search(r"\{.*\}", response.text, re.DOTALL)
        if match:
            json_str = match.group(0)
            return json.loads(json_str)

        raise ValueError("No JSON object found in Gemini response.")

    except Exception as e:
        print(f"[❌] Gemini API error for {image}: {e}")
        return {
            "name": "unknown",
            "category": "unknown",
            "tags": [],
            "color": "unknown",
            "brand": "unknown",
            "target_audience": "unknown",
            "price": "unknown"
        }
