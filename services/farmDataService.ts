import { SensorStatus } from '../types';
import type { Sensor } from '../types';
import { ThermometerIcon, DropletIcon, SunIcon, LeafIcon, VoltageIcon, WaterLevelIcon } from '../components/Icons';
import React from 'react';

const createSensorData = (
  id: string,
  name: string,
  unit: string,
  icon: React.ReactElement,
  minOk: number,
  maxOk: number,
  minWarning: number,
  maxWarning: number,
  fluctuation: number
): Sensor => {
  const baseValue = (minOk + maxOk) / 2;
  const value = parseFloat((baseValue + (Math.random() - 0.5) * fluctuation).toFixed(1));
  
  let status: SensorStatus;
  if (value >= minOk && value <= maxOk) {
    status = SensorStatus.OK;
  } else if (value >= minWarning && value <= maxWarning) {
    status = SensorStatus.WARNING;
  } else {
    status = SensorStatus.DANGER;
  }
  
  return {
    id,
    name,
    value,
    unit,
    icon,
    status,
    timestamp: new Date().toLocaleTimeString(),
  };
};

export const fetchSensorData = (): Promise<Sensor[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data: Sensor[] = [
        createSensorData('soil-moisture-field-a', 'Soil Moisture (Field A)', '%', React.createElement(LeafIcon), 40, 60, 30, 70, 50),
        createSensorData('light-intensity-field-a', 'Light Intensity', 'lux', React.createElement(SunIcon), 40000, 80000, 20000, 100000, 60000),
        createSensorData('voltage-solar-1', 'Solar Panel Voltage', 'V', React.createElement(VoltageIcon), 12.0, 14.5, 11.5, 14.8, 4),
        createSensorData('water-level-well-1', 'Water Well Level', '%', React.createElement(WaterLevelIcon), 50, 90, 25, 100, 80),
      ];
      resolve(data);
    }, 500);
  });
};
