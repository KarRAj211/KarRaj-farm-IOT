import React from 'react';

interface WaterWellControlProps {
  isPumpOn: boolean;
  onToggle: () => void;
  disabled: boolean;
}

const WaterWellControl: React.FC<WaterWellControlProps> = ({ isPumpOn, onToggle, disabled }) => {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg h-full flex flex-col">
      <div className="flex-grow">
        <h2 className="text-xl font-bold text-white mb-4">Water Pump Control</h2>
        <div className="flex items-center space-x-3 mb-6">
          <div className={`w-4 h-4 rounded-full transition-colors ${isPumpOn ? 'bg-green-500' : 'bg-gray-500'}`}></div>
          <span className={`font-semibold transition-colors ${isPumpOn ? 'text-green-400' : 'text-gray-400'}`}>
            Status: {isPumpOn ? 'ON' : 'OFF'}
          </span>
        </div>
      </div>
      <div>
        {disabled && (
          <p className="text-xs text-yellow-400 text-center mb-2">
            Disabled: Low water level
          </p>
        )}
        <button
          onClick={onToggle}
          disabled={disabled}
          className={`w-full py-3 font-bold rounded-lg transition-all text-white focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${disabled 
              ? 'bg-gray-600 cursor-not-allowed opacity-50'
              : isPumpOn 
                ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' 
                : 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
            }`}
        >
          {isPumpOn ? 'Turn Pump OFF' : 'Turn Pump ON'}
        </button>
      </div>
    </div>
  );
};

export default WaterWellControl;
