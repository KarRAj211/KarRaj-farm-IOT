import React, { useState } from 'react';
import { LightbulbIcon } from './Icons';

const LightingControl: React.FC = () => {
  const [isSystemOn, setIsSystemOn] = useState(true);
  const [intensity, setIntensity] = useState(75);

  const toggleSystem = () => {
    setIsSystemOn(prev => !prev);
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Greenhouse Lighting</h2>
          <div className="w-8 h-8 text-yellow-400"><LightbulbIcon /></div>
      </div>

      <div className="flex items-center space-x-3 mb-6">
          <div className={`w-4 h-4 rounded-full transition-colors ${isSystemOn ? 'bg-green-500' : 'bg-gray-500'}`}></div>
          <span className={`font-semibold transition-colors ${isSystemOn ? 'text-green-400' : 'text-gray-400'}`}>
              System Status: {isSystemOn ? 'ON' : 'OFF'}
          </span>
      </div>

      <div className="mb-4 flex-grow">
          <label htmlFor="intensity" className="block text-sm font-medium text-gray-400 mb-2">
            Light Intensity: <span className="font-bold text-white">{intensity}%</span>
          </label>
          <input
            type="range"
            id="intensity"
            min="0"
            max="100"
            value={intensity}
            onChange={(e) => setIntensity(Number(e.target.value))}
            disabled={!isSystemOn}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed disabled:opacity-50
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:bg-yellow-400 [&::-webkit-slider-thumb]:rounded-full
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:bg-yellow-400 [&::-moz-range-thumb]:rounded-full"
          />
      </div>

      <button
        onClick={toggleSystem}
        className={`w-full py-3 font-bold rounded-lg transition-colors text-white focus:outline-none focus:ring-2 focus:ring-opacity-50
          ${isSystemOn 
            ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
            : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
          }`}
      >
        {isSystemOn ? 'Turn System OFF' : 'Turn System ON'}
      </button>
    </div>
  );
};

export default LightingControl;