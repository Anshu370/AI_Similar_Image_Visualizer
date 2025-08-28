import React, { useState, useCallback } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, Loader2 } from 'lucide-react';
import { UploadData } from '../types';

interface UploadSectionProps {
  onUpload: (data: UploadData) => void;
  loading: boolean;
}

const UploadSection: React.FC<UploadSectionProps> = ({ onUpload, loading }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-12">
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
        <div className="flex bg-white rounded-2xl p-2 shadow-lg mb-8 max-w-md mx-auto">
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
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
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