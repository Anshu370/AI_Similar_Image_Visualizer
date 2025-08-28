export interface Product {
  id: string;
  name: string;
  image: string;
  price: string;
  similarity: number;
  brand: string;
  category: string;
}

export interface UploadData {
  type: 'file' | 'url';
  data: File | string;
  preview: string;
}