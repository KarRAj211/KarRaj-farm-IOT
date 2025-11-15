import React from 'react';
import SensorCard from './SensorCard';
import type { Sensor } from '../types';

interface DashboardProps {
  sensors: Sensor[];
  isLoading: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ sensors, isLoading }) => {
  if (isLoading) {
    return (
      <div className="text-center text-gray-300">
        <p>Connecting to farm sensors...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-white">Live Sensor Data</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
        {sensors.map((sensor) => (
          <SensorCard key={sensor.id} sensor={sensor} />
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
