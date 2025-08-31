import React from 'react';
import { Sliders, Filter, Check } from 'lucide-react';

interface FiltersProps {
  similarity: number;
  onSimilarityChange: (value: number) => void;
  availableBrands: string[];
  selectedBrands: string[];
  onBrandFilter: (brand: string) => void;
}

const Filters: React.FC<FiltersProps> = ({ 
  similarity, 
  onSimilarityChange, 
  availableBrands,
  selectedBrands,
  onBrandFilter,
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center">
          <Filter className="h-5 w-5 mr-2 text-purple-600" />
          Filters
        </h2>
        <button
          onClick={() => {
            onSimilarityChange(70);
            // Reset brand filters
            selectedBrands.forEach(brand => onBrandFilter(brand));
          }}
          className="text-sm text-purple-600 hover:text-purple-700 transition-colors"
        >
          Reset
        </button>
      </div>

      <div className="space-y-6">
        {/* Similarity Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 flex items-center">
              <Sliders className="h-4 w-4 mr-1" />
              Similarity Threshold
            </label>
            <span className="text-sm font-medium text-purple-600 bg-purple-50 px-2 py-1 rounded-lg">
              {similarity}%
            </span>
          </div>
          <div className="relative">
            <input
              type="range"
              min="0"
              max="100"
              value={similarity}
              onChange={(e) => onSimilarityChange(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              style={{
                background: `linear-gradient(to right, rgb(147 51 234) 0%, rgb(147 51 234) ${similarity}%, rgb(229 231 235) ${similarity}%, rgb(229 231 235) 100%)`
              }}
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0%</span>
              <span>50%</span>
              <span>100%</span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Higher values show more exact matches
          </p>
        </div>

        {/* Brand Filters */}
        {availableBrands.length > 0 && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Filter by Brand
            </label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {availableBrands.map((brand) => (
                <label
                  key={brand}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => onBrandFilter(brand)}
                      className="sr-only"
                    />
                    <div className={`w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                      selectedBrands.includes(brand)
                        ? 'bg-purple-500 border-purple-500'
                        : 'border-gray-300 group-hover:border-purple-400'
                    }`}>
                      {selectedBrands.includes(brand) && (
                        <Check className="h-3 w-3 text-white" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700 capitalize group-hover:text-purple-600 transition-colors">
                    {brand}
                  </span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Quick Filters */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Quick Filters
          </label>
          <div className="flex flex-wrap gap-2">
            {['High Match', 'Medium Match', 'All Results'].map((filter) => (
              <button
                key={filter}
                onClick={() => {
                  if (filter === 'High Match') onSimilarityChange(85);
                  else if (filter === 'Medium Match') onSimilarityChange(60);
                  else onSimilarityChange(0);
                }}
                className="px-3 py-1.5 text-sm bg-gray-100 hover:bg-purple-50 hover:text-purple-600 rounded-lg transition-colors"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;