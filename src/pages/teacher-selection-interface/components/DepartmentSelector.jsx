import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const DepartmentSelector = ({ 
  selectedDepartment, 
  onDepartmentChange, 
  disabled = false,
  error = null 
}) => {
  const departmentOptions = [
    { 
      value: 'mechanical', 
      label: 'Mechanical Engineering',
      description: 'Ground Floor - Room ME-101',
      color: 'bg-red-500'
    },
    { 
      value: 'electrical', 
      label: 'Electrical Engineering',
      description: '1st Floor - Room EE-201',
      color: 'bg-yellow-400'
    },
    { 
      value: 'cs-it', 
      label: 'Computer Science & IT',
      description: '2nd Floor - Room CS-301',
      color: 'bg-blue-600'
    },
    { 
      value: 'ece', 
      label: 'Electronics & Communication',
      description: '3rd Floor - Room EC-401',
      color: 'bg-green-500'
    },
    { 
      value: 'civil', 
      label: 'Civil Engineering',
      description: '4th Floor - Room CE-501',
      color: 'bg-purple-500'
    }
  ];

  const formatOptionLabel = (option) => (
    <div className="flex items-center space-x-3 py-1">
      <div className={`w-3 h-3 rounded-full ${option?.color}`}></div>
      <div className="flex-1">
        <p className="font-medium text-text-primary">{option?.label}</p>
        <p className="text-xs text-text-secondary">{option?.description}</p>
      </div>
    </div>
  );

  const customOptions = departmentOptions?.map(option => ({
    ...option,
    customLabel: formatOptionLabel(option)
  }));

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Icon name="Building" size={18} className="text-primary" />
        <label className="text-sm font-medium text-text-primary">
          Select Department
        </label>
      </div>
      <Select
        options={customOptions}
        value={selectedDepartment}
        onChange={onDepartmentChange}
        placeholder="Choose your department..."
        disabled={disabled}
        error={error}
        searchable
        className="w-full"
      />
      {selectedDepartment && (
        <div className="mt-3 p-3 bg-muted rounded-md">
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${
              departmentOptions?.find(d => d?.value === selectedDepartment)?.color || 'bg-gray-400'
            }`}></div>
            <p className="text-xs text-text-secondary">
              Department selected: {departmentOptions?.find(d => d?.value === selectedDepartment)?.label}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepartmentSelector;