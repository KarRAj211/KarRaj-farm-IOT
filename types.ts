
import type React from 'react';

export enum SensorStatus {
  OK = 'OK',
  WARNING = 'WARNING',
  DANGER = 'DANGER',
}

export interface Sensor {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: SensorStatus;
  icon: React.ReactElement;
  timestamp: string;
}

export interface Zone {
  id: string;
  name: string;
  isOn: boolean;
}
