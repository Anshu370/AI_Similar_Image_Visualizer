# AI Similar Image Visualizer 🧠🖼️

This project is an **AI-powered image similarity matching system** with an integrated **frontend and backend** designed to match a given image with the most similar products stored in the backend database.

---

## 🛠️ Tech Stack

### Backend
- **FastAPI** – lightweight, fast Python web framework
- **CLIP (ViT-B/32)** – used to extract 512D embeddings of images
- **Google Generative AI (Gemini API)** – for automatic metadata extraction from images
- **Custom Cosine Similarity Function** – compares input embeddings with stored embeddings
- **MongoDB** – stores metadata and embeddings of all product images

### Frontend
- **React.js (Vite)** – fast and modern frontend framework
- **Tailwind CSS** – for sleek and responsive design

---

## 🤖 Machine Learning Model Used

- **CLIP (Contrastive Language–Image Pretraining)** from OpenAI (ViT-B/32 variant)
  - CLIP converts images and texts into the same vector space for semantic similarity.
  - We use it to generate **512-dimensional vector embeddings** for each uploaded image.
  - Other heavier models were avoided due to performance and memory constraints.
  - Hugging Face's transformers and PyTorch libraries were avoided; instead, OpenCLIP was used to reduce size and dependencies.

- **Cosine Similarity (Custom)**: 
  - A lightweight custom implementation is used instead of scikit-learn’s function to keep the project slim.
  - It compares the direction of two vectors (embeddings) to determine similarity.

---

## 🏗️ Backend Architecture

1. **Image Upload**:
   - The user uploads an image via the frontend.
2. **Metadata Generation**:
   - The uploaded image is passed to the **Google Gemini API** to generate product metadata (category, color, brand, etc.).
3. **Embedding Generation**:
   - The image is encoded into a 512D vector using **OpenCLIP (ViT-B/32)**.
4. **Similarity Matching**:
   - The embedding is compared with all stored embeddings in MongoDB using a **custom cosine similarity** function.
5. **Response**:
   - The API returns a list of products sorted by similarity score and filtered tags/brands for frontend filtering.

---

## 📂 Image Categories in Database

The system currently supports and stores images from the following categories:

1. Bags
2. Electronics (Mobiles, Laptops, Smartwatches)
3. Shoes
4. Watches
5. Packed Namkeens and Chips
6. Fruits and Vegetables

---

## 🧠 How CLIP & Cosine Similarity Work

- **CLIP**: Projects images and text into the same semantic space using a pre-trained Transformer model. For images, it outputs a 512D embedding vector.
- **Cosine Similarity**: Measures the cosine of the angle between two non-zero vectors. A smaller angle means higher similarity (closer in semantic space).

---

## 📦 Project Structure

📁 AI_Similar_Image_Visualizer
│
├── 📁 backend
│ ├── main.py
│ ├── api/endpoints.py
│ └── utility/
│ ├── CLIP_utils.py
│ ├── Gemini_utils.py
│ ├── Mongo_database.py
│ └── file_handler.py
│
├── 📁 frontend
│ └── (React components)
│
├── requirements.txt
└── README.md


---


## 🚀 Future Improvements

- Replace Gemini API with open-source metadata models for self-hosting.
- Integrate FAISS for faster vector search at scale.
- Add user login and product bookmarking.

---


## 👤 Developed By

**Anshu Gupta**  
B.Tech CSE (Cyber Security), PSIT Kanpur  
Passionate about building efficient, AI-driven systems for real-world problems.