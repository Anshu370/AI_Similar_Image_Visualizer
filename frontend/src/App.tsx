import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadSection from './components/UploadSection';
import QueryImage from './components/QueryImage';
import Filters from './components/Filters';
import Results from './components/Results';
import { UploadData, Product, ImageMetadata, ApiResponse } from './types';
import { uploadImageForMatching } from './services/api';

function App() {
  const [currentScreen, setCurrentScreen] = useState<'upload' | 'results'>('upload');
  const [uploadData, setUploadData] = useState<UploadData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [similarity, setSimilarity] = useState(70);
  const [products, setProducts] = useState<Product[]>([]);
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata | null>(null);
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (data: UploadData) => {
    setLoading(true);
    setError(null);
    setUploadData(data);
    
    try {
      const response: ApiResponse = await uploadImageForMatching(data.data);
      
      if (response.status_code === 200) {
        setImageMetadata(response["Image metadata"].metadata);
        setProducts(response.Result.Content);
        setAvailableBrands(response.Result.Filter_brand);
        setSelectedBrands([]); // Reset brand filters
        setCurrentScreen('results');
      } else {
        throw new Error('Failed to process image');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNewSearch = () => {
    setCurrentScreen('upload');
    setUploadData(null);
    setImageMetadata(null);
    setProducts([]);
    setAvailableBrands([]);
    setSelectedBrands([]);
    setSearchQuery('');
    setSimilarity(70);
    setError(null);
  };

  const handleBrandFilter = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  if (currentScreen === 'upload') {
    return <UploadSection onUpload={handleUpload} loading={loading} error={error} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {uploadData && (
              <QueryImage 
                imageUrl={uploadData.preview} 
                metadata={imageMetadata}
                onNewSearch={handleNewSearch}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Filters
              similarity={similarity}
              onSimilarityChange={setSimilarity}
              availableBrands={availableBrands}
              selectedBrands={selectedBrands}
              onBrandFilter={handleBrandFilter}
            />
            
            <Results
              products={products}
              loading={loading}
              searchQuery={searchQuery}
              similarityThreshold={similarity}
              selectedBrands={selectedBrands}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;