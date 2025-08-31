import React from 'react';
import { ExternalLink, Heart, Star } from 'lucide-react';
import { Product } from '../types';

interface ResultsProps {
  products: Product[];
  loading: boolean;
  searchQuery: string;
  similarityThreshold: number;
  selectedBrands: string[];
}

const Results: React.FC<ResultsProps> = ({ 
  products, 
  loading, 
  searchQuery, 
  similarityThreshold,
  selectedBrands 
}) => {
  // Filter products based on search query and similarity threshold
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesSimilarity = (product.similarity * 100) >= similarityThreshold;
    
    const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand.toLowerCase());
    
    return matchesSearch && matchesSimilarity && matchesBrand;
  });

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
            <div className="h-64 bg-gray-200" />
            <div className="p-6 space-y-3">
              <div className="h-4 bg-gray-200 rounded" />
              <div className="h-4 bg-gray-200 rounded w-2/3" />
              <div className="h-6 bg-gray-200 rounded w-20" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No matches found</h3>
        <p className="text-gray-500 mb-4">
          Try lowering the similarity threshold or adjusting your search terms.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          <span className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
            Current threshold: {similarityThreshold}%
          </span>
          {searchQuery && (
            <span className="px-3 py-1 bg-purple-100 rounded-full text-sm text-purple-600">
              Searching: "{searchQuery}"
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
          {searchQuery && (
            <span className="ml-2 px-2 py-1 bg-purple-100 text-purple-600 rounded-full text-xs">
              "{searchQuery}"
            </span>
          )}
        </p>
        <p className="text-sm text-gray-500">
          Similarity ≥ {similarityThreshold}%
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=400`;
                }}
              />
              
              {/* Similarity Badge */}
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  (product.similarity * 100) >= 90 
                    ? 'bg-green-500 text-white' 
                    : (product.similarity * 100) >= 70 
                    ? 'bg-yellow-500 text-white' 
                    : 'bg-gray-500 text-white'
                }`}>
                  {Math.round(product.similarity * 100)}% match
                </span>
              </div>
            </div>

            {/* Product Info */}
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                <button className="p-1 text-gray-400 hover:text-purple-600 transition-colors">
                  <ExternalLink className="h-4 w-4" />
                </button>
              </div>

              <p className="text-sm text-gray-500 mb-3">{product.brand}</p>

              <div className="flex items-center justify-between mb-3">
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  {product.category}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs rounded-full">
                  {product.target_audience}
                </span>
              </div>

              {/* Tags */}
              {product.tags && Array.isArray(product.tags) && product.tags.length > 0 && (
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {product.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-purple-50 text-purple-600 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                    {product.tags.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs rounded-full">
                        +{product.tags.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Similarity Score */}
              <div className="flex items-center mb-4">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm text-gray-600">
                  {Math.round(product.similarity * 100)}% similarity
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Results;