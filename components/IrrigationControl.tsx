import React, { useState } from 'react';
import { SprinklerIcon, PlusIcon, EditIcon, TrashIcon } from './Icons';
import type { Zone } from '../types';

interface IrrigationControlProps {
  zones: Zone[];
  onToggleZone: (id: string) => void;
  onAddField: () => void;
  onRemoveField: (id: string) => void;
  onEditField: (id: string, newName: string) => void;
  disabled: boolean;
}

const IrrigationControl: React.FC<IrrigationControlProps> = ({ zones, onToggleZone, onAddField, onRemoveField, onEditField, disabled }) => {
  const [editingZoneId, setEditingZoneId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const handleEditClick = (zone: Zone) => {
    setEditingZoneId(zone.id);
    setEditingName(zone.name);
  };

  const handleSaveClick = (id: string) => {
    if (editingName.trim()) {
      onEditField(id, editingName.trim());
    }
    setEditingZoneId(null);
    setEditingName('');
  };

  const handleCancelClick = () => {
    setEditingZoneId(null);
    setEditingName('');
  };
  
  const handleRemoveClick = (id: string, name: string) => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      onRemoveField(id);
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 shadow-lg h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 text-blue-400"><SprinklerIcon /></div>
          <h2 className="text-xl font-bold text-white">Irrigation System</h2>
        </div>
        <button 
          onClick={onAddField}
          disabled={disabled}
          className="p-2 bg-green-600/50 rounded-full text-white hover:bg-green-600 transition-colors disabled:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Add new field"
        >
          <div className="w-5 h-5"><PlusIcon /></div>
        </button>
      </div>

      {disabled && (
        <div className="text-xs text-yellow-400 mb-4 bg-yellow-500/10 p-2 rounded-md text-center">
          <p>Controls disabled due to low water level in the well.</p>
        </div>
      )}
      
      <div className="space-y-3 flex-grow overflow-y-auto pr-2">
        {zones.map(zone => (
          <div key={zone.id} className="flex items-center justify-between bg-gray-900/50 p-3 rounded-lg">
            {editingZoneId === zone.id ? (
              <input
                type="text"
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onBlur={() => handleSaveClick(zone.id)}
                onKeyDown={(e) => e.key === 'Enter' && handleSaveClick(zone.id)}
                className="bg-gray-700 text-white font-medium rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <span className="font-medium text-gray-300">{zone.name}</span>
            )}

            <div className="flex items-center space-x-2">
              {editingZoneId === zone.id ? (
                <>
                  <button onClick={() => handleSaveClick(zone.id)} className="text-green-400 hover:text-green-300">Save</button>
                  <button onClick={handleCancelClick} className="text-gray-400 hover:text-gray-300">Cancel</button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditClick(zone)} disabled={disabled} className="p-1 text-gray-400 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"><div className="w-5 h-5"><EditIcon/></div></button>
                  <button onClick={() => handleRemoveClick(zone.id, zone.name)} disabled={disabled} className="p-1 text-gray-400 hover:text-red-500 disabled:opacity-50 disabled:cursor-not-allowed"><div className="w-5 h-5"><TrashIcon/></div></button>
                  <button
                    onClick={() => onToggleZone(zone.id)}
                    disabled={disabled}
                    className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-blue-500 ${
                      disabled ? 'bg-gray-700 cursor-not-allowed' : zone.isOn ? 'bg-blue-600' : 'bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform ${
                        zone.isOn ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
        {zones.length === 0 && (
          <div className="text-center py-6 text-gray-500">
            <p>No fields added yet.</p>
            <p className="text-sm">Click the '+' button to add one.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default IrrigationControl;