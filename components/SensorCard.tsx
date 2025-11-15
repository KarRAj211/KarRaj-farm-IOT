
import React from 'react';
import { Sensor, SensorStatus } from '../types';

interface SensorCardProps {
  sensor: Sensor;
}

const statusStyles = {
  [SensorStatus.OK]: {
    bg: 'bg-green-500/20',
    text: 'text-green-400',
    dot: 'bg-green-500',
    message: 'Normal',
  },
  [SensorStatus.WARNING]: {
    bg: 'bg-yellow-500/20',
    text: 'text-yellow-400',
    dot: 'bg-yellow-500',
    message: 'Warning',
  },
  [SensorStatus.DANGER]: {
    bg: 'bg-red-500/20',
    text: 'text-red-400',
    dot: 'bg-red-500',
    message: 'Danger',
  },
};

const SensorCard: React.FC<SensorCardProps> = ({ sensor }) => {
  const styles = statusStyles[sensor.status];

  return (
    <div className={`
      bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl 
      p-6 flex flex-col justify-between transform transition-all 
      duration-300 hover:scale-105 hover:border-gray-500 shadow-lg`
    }>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg text-gray-200">{sensor.name}</h3>
          <div className="w-8 h-8 text-gray-400">
            {sensor.icon}
          </div>
        </div>
        <div className="text-center my-4">
          <p className="text-5xl font-bold text-white">
            {sensor.value}<span className="text-2xl font-medium text-gray-400 ml-1">{sensor.unit}</span>
          </p>
        </div>
      </div>
      <div className="mt-4">
        <div className={`flex items-center justify-center p-2 rounded-lg ${styles.bg} ${styles.text}`}>
          <div className={`w-3 h-3 rounded-full mr-2 ${styles.dot}`}></div>
          <span className="font-medium text-sm">{styles.message}</span>
        </div>
        <p className="text-center text-xs text-gray-500 mt-3">
          Last updated: {sensor.timestamp}
        </p>
      </div>
    </div>
  );
};

export default SensorCard;
