import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import UploadSection from './components/UploadSection';
import QueryImage from './components/QueryImage';
import Filters from './components/Filters';
import Results from './components/Results';
import { UploadData, Product } from './types';

// Mock data for demonstration
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Wireless Headphones',
    image: 'https://images.pexels.com/photos/3587478/pexels-photo-3587478.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$299.99',
    similarity: 95,
    brand: 'AudioTech',
    category: 'Electronics'
  },
  {
    id: '2',
    name: 'Premium Bluetooth Speaker',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$199.99',
    similarity: 87,
    brand: 'SoundWave',
    category: 'Electronics'
  },
  {
    id: '3',
    name: 'Studio Monitor Speakers',
    image: 'https://images.pexels.com/photos/164854/pexels-photo-164854.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$449.99',
    similarity: 82,
    brand: 'ProAudio',
    category: 'Electronics'
  },
  {
    id: '4',
    name: 'Noise Canceling Earbuds',
    image: 'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$179.99',
    similarity: 78,
    brand: 'TechSound',
    category: 'Electronics'
  },
  {
    id: '5',
    name: 'Gaming Headset Pro',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$349.99',
    similarity: 75,
    brand: 'GameAudio',
    category: 'Gaming'
  },
  {
    id: '6',
    name: 'Vintage Radio Speaker',
    image: 'https://images.pexels.com/photos/1841841/pexels-photo-1841841.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$129.99',
    similarity: 65,
    brand: 'RetroSound',
    category: 'Vintage'
  }
];

function App() {
  const [currentScreen, setCurrentScreen] = useState<'upload' | 'results'>('upload');
  const [uploadData, setUploadData] = useState<UploadData | null>(null);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [similarity, setSimilarity] = useState(70);

  const handleUpload = async (data: UploadData) => {
    setLoading(true);
    setUploadData(data);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setLoading(false);
    setCurrentScreen('results');
  };

  const handleNewSearch = () => {
    setCurrentScreen('upload');
    setUploadData(null);
    setSearchQuery('');
    setSimilarity(70);
  };


  if (currentScreen === 'upload') {
    return <UploadSection onUpload={handleUpload} loading={loading} />;
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
                onNewSearch={handleNewSearch}
              />
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Filters
              similarity={similarity}
              onSimilarityChange={setSimilarity}
            />
            
            <Results
              products={mockProducts}
              loading={false}
              searchQuery={searchQuery}
              similarityThreshold={similarity}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;