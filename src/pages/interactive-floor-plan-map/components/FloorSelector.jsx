// floor selector file
import React from 'react';
import Icon from '../../../components/AppIcon';

const FloorSelector = ({ 
  currentFloor = 2, 
  onFloorChange = null,
  selectedDepartment = "Computer Science",
  variant = "desktop" // "desktop" | "mobile"
}) => {
  const floorData = [
    { floor: 0, name: 'Ground Floor', department: 'Mechanical', color: '#EF4444' },
    { floor: 1, name: '1st Floor', department: 'Electrical', color: '#FBBF24' },
    { floor: 2, name: '2nd Floor', department: 'Computer Science', color: '#2563EB' },
    { floor: 3, name: '3rd Floor', department: 'ECE', color: '#10B981' },
    { floor: 4, name: '4th Floor', department: 'Civil', color: '#8B5CF6' }
  ];

  const handleFloorClick = (floor) => {
    if (onFloorChange) {
      onFloorChange(floor);
    }
  };

  // Desktop Sidebar Version
  if (variant === "desktop") {
    return (
      <div className="hidden lg:block w-64 bg-white border-r border-gray-200 h-full">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Floor Navigation</h3>
          
          <div className="space-y-2">
            {floorData?.map((floor) => (
              <button
                key={floor?.floor}
                onClick={() => handleFloorClick(floor?.floor)}
                className={`
                  w-full flex items-center space-x-3 p-3 rounded-lg text-left transition-all duration-200
                  ${currentFloor === floor?.floor 
                    ? 'bg-blue-50 border-2 border-blue-200 shadow-sm' 
                    : 'hover:bg-gray-50 border-2 border-transparent'
                  }
                `}
              >
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: floor?.color }}
                ></div>
                
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${
                    currentFloor === floor?.floor ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {floor?.name}
                  </p>
                  <p className={`text-xs ${
                    currentFloor === floor?.floor ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {floor?.department}
                  </p>
                </div>

                {currentFloor === floor?.floor && (
                  <Icon name="Check" size={16} color="#2563EB" />
                )}

                {floor?.department === selectedDepartment && (
                  <Icon name="MapPin" size={16} color={floor?.color} />
                )}
              </button>
            ))}
          </div>

          {/* Current Selection Info */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">
              Current View
            </p>
            <div className="flex items-center space-x-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: floorData?.[currentFloor]?.color }}
              ></div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {floorData?.[currentFloor]?.name}
                </p>
                <p className="text-xs text-gray-600">
                  {floorData?.[currentFloor]?.department}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Mobile Floating Version
  return (
    <div className="lg:hidden fixed bottom-20 left-4 right-4 z-20">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-gray-900">Floor Navigation</h4>
          <div className="flex items-center space-x-2">
            <div 
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: floorData?.[currentFloor]?.color }}
            ></div>
            <span className="text-xs text-gray-600">
              {floorData?.[currentFloor]?.name}
            </span>
          </div>
        </div>

        <div className="flex space-x-2 overflow-x-auto pb-2">
          {floorData?.map((floor) => (
            <button
              key={floor?.floor}
              onClick={() => handleFloorClick(floor?.floor)}
              className={`
                flex-shrink-0 flex flex-col items-center space-y-1 p-2 rounded-md min-w-[60px]
                transition-all duration-200
                ${currentFloor === floor?.floor 
                  ? 'bg-blue-50 border border-blue-200' :'hover:bg-gray-50 border border-transparent'
                }
              `}
            >
              <div 
                className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
                style={{ backgroundColor: floor?.color }}
              >
                {floor?.floor}
              </div>
              
              <div className="text-center">
                <p className={`text-xs font-medium ${
                  currentFloor === floor?.floor ? 'text-blue-900' : 'text-gray-700'
                }`}>
                  {floor?.name?.split(' ')?.[0]}
                </p>
                <p className="text-xs text-gray-500 truncate max-w-[50px]">
                  {floor?.department?.split(' ')?.[0]}
                </p>
              </div>

              {floor?.department === selectedDepartment && (
                <Icon name="MapPin" size={12} color={floor?.color} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FloorSelector;