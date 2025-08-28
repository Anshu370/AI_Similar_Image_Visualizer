import React from 'react';
import { Search, Zap } from 'lucide-react';

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <header className="bg-white/90 backdrop-blur-lg border-b border-gray-200/50 sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
           
          {/* Logo */}
          <div className="flex items-center space-x-2 group">
            <div className="p-2 rounded-lg animated-gradient animated-gradient-hover bg-gradient-to-r from-purple-500 to-blue-600 animate-gradient">
              <Zap className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent animated-gradient animated-gradient-hover group-hover:background-position-right transition-all duration-500 animate-gradient">
              Image Visualizer
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-purple-300 rounded-full focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all duration-200"
              />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Header;