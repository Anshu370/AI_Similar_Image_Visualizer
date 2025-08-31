import React, { useState, useCallback } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import { UploadData } from '../types';

interface UploadSectionProps {
  onUpload: (data: UploadData) => void;
  loading: boolean;
  error: string | null;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUpload, loading, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [uploadMethod, setUploadMethod] = useState<'file' | 'url'>('file');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const preview = URL.createObjectURL(file);
        onUpload({ type: 'file', data: file, preview });
      }
    }
  }, [onUpload]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      const preview = URL.createObjectURL(file);
      onUpload({ type: 'file', data: file, preview });
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onUpload({ type: 'url', data: urlInput.trim(), preview: urlInput.trim() });
    }
  };

  const handleSubmit = () => {
    if (uploadMethod === 'url') {
      handleUrlSubmit();
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Interactive Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
        {/* Floating Geometric Shapes */}
        <div className="absolute inset-0">
          {/* Large Circle */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-purple-200/30 to-blue-200/30 rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-blue-200/40 to-indigo-200/40 rounded-full animate-bounce" style={{ animationDuration: '3s' }}></div>
          
          {/* Floating Squares */}
          <div className="absolute bottom-32 left-20 w-16 h-16 bg-gradient-to-r from-indigo-200/30 to-purple-200/30 rounded-lg rotate-45 animate-spin" style={{ animationDuration: '8s' }}></div>
          <div className="absolute top-60 left-1/3 w-12 h-12 bg-gradient-to-r from-pink-200/40 to-purple-200/40 rounded-lg rotate-12 animate-pulse" style={{ animationDelay: '1s' }}></div>
          
          {/* Triangular Shapes */}
          <div className="absolute bottom-20 right-32 w-0 h-0 border-l-[20px] border-r-[20px] border-b-[35px] border-l-transparent border-r-transparent border-b-blue-200/30 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}></div>
          
          {/* Moving Gradient Orbs */}
          <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-300/20 to-blue-300/20 rounded-full blur-xl animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-r from-blue-300/15 to-indigo-300/15 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '2s' }}></div>
          
          {/* Floating Lines */}
          <div className="absolute top-1/3 right-1/3 w-32 h-1 bg-gradient-to-r from-transparent via-purple-300/50 to-transparent rotate-45 animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-1/3 left-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent -rotate-45 animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }}></div>
          
          {/* Hexagonal Shapes */}
          <div className="absolute top-1/2 left-16 w-8 h-8 bg-gradient-to-r from-indigo-200/40 to-purple-200/40 transform rotate-45 animate-spin" style={{ animationDuration: '10s' }}></div>
          <div className="absolute bottom-1/2 right-16 w-6 h-6 bg-gradient-to-r from-blue-200/50 to-pink-200/50 transform rotate-12 animate-pulse" style={{ animationDuration: '3s' }}></div>
          
          {/* Animated Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-100/10 via-transparent to-blue-100/10 animate-pulse" style={{ animationDuration: '12s' }}></div>
        </div>
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(147, 51, 234, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(147, 51, 234, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px'
          }}></div>
        </div>
      </div>
      
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12 relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl mb-6">
            <ImageIcon className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Similar Image Visualizer
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto">
            Upload an image or provide a URL to find visually similar products using AI
          </p>
        </div>

        {/* Method Selector */}
        <div className="flex bg-white/90 backdrop-blur-sm rounded-2xl p-2 shadow-lg mb-8 max-w-md mx-auto relative z-10">
          <button
            onClick={() => setUploadMethod('file')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 ${
              uploadMethod === 'file'
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Upload className="h-4 w-4" />
            <span className="font-medium">Upload File</span>
          </button>
          <button
            onClick={() => setUploadMethod('url')}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-xl transition-all duration-200 ${
              uploadMethod === 'url'
                ? 'bg-gradient-to-r from-purple-500 to-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <LinkIcon className="h-4 w-4" />
            <span className="font-medium">Image URL</span>
          </button>
        </div>

        {/* Upload Area */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 mb-6 relative z-10">
            <p className="text-red-600 text-center">{error}</p>
          </div>
        )}
        
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden relative z-10">
          {uploadMethod === 'file' ? (
            <div
              className={`relative border-2 border-dashed transition-all duration-300 m-8 rounded-2xl ${
                dragActive
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                disabled={loading}
              />
              <div className="flex flex-col items-center justify-center py-6 px-4 text-center">
                {loading ? (
                  <>
                    <Loader2 className="h-8 w-8 text-purple-500 animate-spin mb-2" />
                    <p className="text-lg font-medium text-gray-700 mb-2">Processing your image...</p>
                    <p className="text-sm text-gray-500">This may take a few moments</p>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <p className="text-lg font-medium text-gray-700 mb-2">
                      {dragActive ? 'Drop your image here' : 'Drag & drop an image here'}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">or click to browse files</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-400">
                      <span>Supports: JPG, PNG, GIF, WebP</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8">
              <div className="space-y-6">
                <div>
                  <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="url-input"
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      disabled={loading}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={!urlInput.trim() || loading}
                  className="w-full bg-gradient-to-r from-purple-500 to-blue-600 text-white py-3 px-6 rounded-xl font-medium hover:from-purple-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Find Similar Images</span>
                      <Upload className="h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadSection;