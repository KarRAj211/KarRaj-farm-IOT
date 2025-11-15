import React from 'react';

interface HeroProps {
  onViewDashboard: () => void;
  onViewCameras: () => void;
  onViewWaterControls: () => void;
  onViewAlerts: () => void;
}

const Hero: React.FC<HeroProps> = ({ onViewDashboard, onViewCameras, onViewWaterControls, onViewAlerts }) => {
  return (
    <header className="flex flex-col items-center justify-center h-screen text-center px-4">
      <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
        Welcome to Your Farm
      </h1>
      <p className="max-w-2xl text-lg md:text-xl text-gray-200 mb-8 drop-shadow-md">
        Monitor your farm's vital signs in real-time. Get instant insights from your Arduino sensors to ensure optimal growth and health for your crops.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={onViewDashboard}
          className="px-8 py-3 bg-green-600 text-white font-semibold rounded-full hover:bg-green-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 shadow-lg"
        >
          View Dashboard
        </button>
        <button
          onClick={onViewCameras}
          className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-lg"
        >
          View Camera
        </button>
        <button
          onClick={onViewWaterControls}
          className="px-8 py-3 bg-teal-600 text-white font-semibold rounded-full hover:bg-teal-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 shadow-lg"
        >
          Water Controls
        </button>
        <button
          onClick={onViewAlerts}
          className="px-8 py-3 bg-yellow-600 text-white font-semibold rounded-full hover:bg-yellow-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 shadow-lg"
        >
          Farm Alerts
        </button>
      </div>
    </header>
  );
};

export default Hero;