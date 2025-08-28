import React from 'react';
import { Image as ImageIcon, RotateCcw } from 'lucide-react';

interface QueryImageProps {
  imageUrl: string;
  onNewSearch: () => void;
}

const QueryImage: React.FC<QueryImageProps> = ({ imageUrl, onNewSearch }) => {
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
            className="flex items-center space-x-0 text-sm text-purple-600 hover:text-purple-900 transition-colors"
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

        {/* Image Info */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Status:</span>
            <span className="text-green-600 font-medium">Analyzed</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-500">Matches:</span>
            <span className="text-gray-900 font-medium">12 found</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QueryImage;