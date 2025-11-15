import React, { useState, useEffect } from 'react';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import CameraView from './components/CameraView';
import IrrigationControl from './components/IrrigationControl';
import BuzzerControl from './components/BuzzerControl';
import { fetchSensorData } from './services/farmDataService';
import type { Sensor, Zone } from './types';

const App: React.FC = () => {
  const [sensorData, setSensorData] = useState<Sensor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [zones, setZones] = useState<Zone[]>([
    { id: 'field-a', name: 'Field A', isOn: false },
    { id: 'field-b', name: 'Field B', isOn: true },
  ]);

  const waterLevelSensor = sensorData.find(s => s.id === 'water-level-well-1');
  const isWaterLevelLow = waterLevelSensor ? waterLevelSensor.value < 20 : false;

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchSensorData();
        setSensorData(data);
      } catch (error) {
        console.error("Failed to fetch sensor data", error);
      } finally {
        setIsLoading(false);
      }
    };

    getData();
    const intervalId = setInterval(getData, 5000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isWaterLevelLow) {
      if (zones.some(z => z.isOn)) {
        setZones(currentZones => currentZones.map(z => ({ ...z, isOn: false })));
      }
    }
  }, [isWaterLevelLow, zones]);

  const handleViewDashboard = () => {
    document.getElementById('dashboard')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewCameras = () => {
    document.getElementById('cameras')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleViewWaterControls = () => {
    document.getElementById('water-controls')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleViewAlerts = () => {
    document.getElementById('alerts')?.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleZone = (id: string) => {
    if (!isWaterLevelLow) {
      setZones(currentZones => 
        currentZones.map(zone => 
          zone.id === id ? { ...zone, isOn: !zone.isOn } : zone
        )
      );
    }
  };
  
  const addField = () => {
    const newFieldName = `Field ${String.fromCharCode(65 + zones.length)}`;
    const newField: Zone = {
      id: `field-${Date.now()}`,
      name: newFieldName,
      isOn: false,
    };
    setZones(currentZones => [...currentZones, newField]);
  };

  const removeField = (id: string) => {
    setZones(currentZones => currentZones.filter(zone => zone.id !== id));
  };

  const editFieldName = (id: string, newName: string) => {
    setZones(currentZones =>
      currentZones.map(zone =>
        zone.id === id ? { ...zone, name: newName } : zone
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1499529112087-3cb3b73cec95?q=80&w=1974&auto=format&fit=crop')` }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>
      
      <div className="relative z-10">
        <div className="absolute w-full top-0 pt-8 z-20">
            <h1 className="text-5xl font-bold text-center text-white tracking-widest drop-shadow-lg">
                KARRAJ
            </h1>
            <hr className="mt-4 w-full border-t-2 border-black" />
        </div>

        <Hero 
          onViewDashboard={handleViewDashboard} 
          onViewCameras={handleViewCameras} 
          onViewWaterControls={handleViewWaterControls} 
          onViewAlerts={handleViewAlerts}
        />
        <main id="dashboard" className="py-12 md:py-20 px-4 md:px-8">
          <Dashboard sensors={sensorData} isLoading={isLoading} />

          <div id="cameras" className="container mx-auto mt-12 md:mt-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Live Camera Feed</h2>
            <div className="flex justify-center">
              <div className="w-full md:w-3/4 lg:w-1/2">
                <CameraView 
                  title="North Field" 
                  imageUrl="https://images.unsplash.com/photo-1586771107445-d3ca888e2c0b?q=80&w=2070&auto=format&fit=crop"
                />
              </div>
            </div>
          </div>

          <div id="water-controls" className="container mx-auto mt-12 md:mt-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Water Management</h2>
            <div className="flex justify-center">
              <div className="w-full md:w-3/4 lg:w-1/2">
                <IrrigationControl 
                  zones={zones}
                  onToggleZone={toggleZone}
                  onAddField={addField}
                  onRemoveField={removeField}
                  onEditField={editFieldName}
                  disabled={isWaterLevelLow}
                />
              </div>
            </div>
          </div>

          <div id="alerts" className="container mx-auto mt-12 md:mt-16">
            <h2 className="text-3xl font-bold text-center mb-10 text-white">Farm Alerts</h2>
            <div className="flex justify-center">
              <div className="w-full md:w-3/4 lg:w-1/2">
                <BuzzerControl />
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
};

export default App;