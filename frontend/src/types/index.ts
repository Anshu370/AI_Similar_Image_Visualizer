export interface Product {
  id: string;
  name: string;
  similarity: number;
  category: string;
  image_url: string;
  tags: string[];
  target_audience: string;
  brand: string;
}

export interface UploadData {
  type: 'file' | 'url';
  data: File | string;
  preview: string;
}

export interface ImageMetadata {
  category: string;
  color: string;
  material: string;
  brand: string;
  tags: string[];
}

export interface ApiResponse {
  status_code: number;
  "Image metadata": {
    metadata: ImageMetadata;
    embedding: number[];
  };
  Result: {
    Content: Product[];
    Filter_brand: string[];
  };
  message: string;
}