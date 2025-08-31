import React from 'react';
import { Image as ImageIcon, RotateCcw, Tag, Palette, Package, Award } from 'lucide-react';
import { ImageMetadata } from '../types';

interface QueryImageProps {
  imageUrl: string;
  metadata: ImageMetadata | null;
  onNewSearch: () => void;
}

const QueryImage: React.FC<QueryImageProps> = ({ imageUrl, metadata, onNewSearch }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden sticky top-24">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <ImageIcon className="h-5 w-5 mr-2 text-purple-600" />
            Query Image
          </h2>
          <button
            onClick={onNewSearch}
            className="flex items-center space-x-1 text-sm text-purple-600 hover:text-purple-900 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            <span>New Search</span>
          </button>
        </div>
      </div>

      {/* Image */}
      <div className="p-6">
        <div className="relative group">
          <img
            src={imageUrl}
            alt="Query image"
            className="w-full h-64 object-cover rounded-xl shadow-sm group-hover:shadow-md transition-shadow duration-200"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = `https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=400`;
            }}
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-200 rounded-xl" />
        </div>

        {/* Image Metadata */}
        <div className="mt-4 space-y-2">
          {metadata ? (
            <>
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Image Analysis</h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Package className="h-4 w-4 text-purple-500 mr-2" />
                  <span className="text-gray-500">Category:</span>
                  <span className="ml-auto font-medium text-gray-900 capitalize">{metadata.category}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Palette className="h-4 w-4 text-blue-500 mr-2" />
                  <span className="text-gray-500">Color:</span>
                  <span className="ml-auto font-medium text-gray-900 capitalize">{metadata.color}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-green-500 mr-2" />
                  <span className="text-gray-500">Material:</span>
                  <span className="ml-auto font-medium text-gray-900 capitalize">{metadata.material}</span>
                </div>
                
                <div className="flex items-center text-sm">
                  <Award className="h-4 w-4 text-orange-500 mr-2" />
                  <span className="text-gray-500">Brand:</span>
                  <span className="ml-auto font-medium text-gray-900 capitalize">{metadata.brand}</span>
                </div>
                
                {metadata.tags && metadata.tags.length > 0 && (
                  <div className="pt-2">
                    <div className="flex items-center text-sm mb-2">
                      <Tag className="h-4 w-4 text-indigo-500 mr-2" />
                      <span className="text-gray-500">Tags:</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {metadata.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Status:</span>
              <span className="text-green-600 font-medium">Analyzed</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QueryImage;