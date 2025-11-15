import React from 'react';

interface CameraViewProps {
  title: string;
  imageUrl: string;
}

const CameraView: React.FC<CameraViewProps> = ({ title, imageUrl }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">{title}</h2>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <span className="text-red-400 font-semibold text-sm">LIVE</span>
        </div>
      </div>
      <div className="aspect-video bg-black rounded-lg overflow-hidden border-2 border-gray-700">
        <img 
          src={imageUrl}
          alt={`Live farm camera feed from ${title}`} 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default CameraView;