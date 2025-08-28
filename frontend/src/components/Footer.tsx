import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row justify-between items-center">

          <p className="text-sm text-gray-400">
            © 2025 Image Visualizer. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 flex items-center mt-4 sm:mt-0">
            Made By Anshu Gupta 2201641720022 Pranveer Singh Institute of Technology
          </p>
        
      </div>
    </footer>
  );
};

export default Footer;