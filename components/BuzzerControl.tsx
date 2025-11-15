import React, { useState, useEffect } from 'react';
import { BuzzerIcon } from './Icons';

const BuzzerControl: React.FC = () => {
  const [isBuzzerOn, setIsBuzzerOn] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    let countdownInterval: ReturnType<typeof setInterval>;

    if (isBuzzerOn) {
      setCountdown(20);
      timer = setTimeout(() => {
        setIsBuzzerOn(false);
        setCountdown(0);
      }, 20000);

      countdownInterval = setInterval(() => {
        setCountdown(prev => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }

    return () => {
      clearTimeout(timer);
      clearInterval(countdownInterval);
    };
  }, [isBuzzerOn]);

  const handleActivateBuzzer = () => {
    if (!isBuzzerOn) {
      setIsBuzzerOn(true);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg h-full flex flex-col">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-white">Farm Buzzer</h2>
            <div className="w-8 h-8 text-yellow-400"><BuzzerIcon /></div>
        </div>
        <div className="flex-grow flex flex-col items-center justify-center my-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors mb-4 ${isBuzzerOn ? 'bg-red-500/30' : 'bg-gray-700'}`}>
                <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${isBuzzerOn ? 'bg-red-500 animate-pulse' : 'bg-gray-600'}`}>
                    <div className="w-8 h-8 text-white"><BuzzerIcon /></div>
                </div>
            </div>
            <span className={`font-semibold transition-colors ${isBuzzerOn ? 'text-red-400' : 'text-gray-400'}`}>
                Status: {isBuzzerOn ? 'ACTIVE' : 'OFF'}
            </span>
            {isBuzzerOn && (
                <p className="text-sm text-gray-300 mt-2">
                    Turning off in {countdown}s...
                </p>
            )}
        </div>
        <button
            onClick={handleActivateBuzzer}
            disabled={isBuzzerOn}
            className={`w-full py-3 font-bold rounded-lg transition-all text-white focus:outline-none focus:ring-2 focus:ring-opacity-50
              ${isBuzzerOn
                ? 'bg-gray-600 cursor-not-allowed opacity-50'
                : 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500'
              }`}
        >
            {isBuzzerOn ? 'Buzzing...' : 'Activate Buzzer'}
        </button>
    </div>
  );
};

export default BuzzerControl;
