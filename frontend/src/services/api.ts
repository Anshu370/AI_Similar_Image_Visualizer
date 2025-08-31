import { ApiResponse } from '../types';

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'https://your-api-endpoint.com';

export const uploadImageForMatching = async (imageData: File | string): Promise<ApiResponse> => {
  const formData = new FormData();
  
  if (imageData instanceof File) {
    formData.append('image', imageData);
  } else {
    // For URL, we need to fetch the image first and convert to blob
    const response = await fetch(imageData);
    const blob = await response.blob();
    formData.append('image', blob);
  }

  const response = await fetch(`${API_BASE_URL}/api/match`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }

  return response.json();
};