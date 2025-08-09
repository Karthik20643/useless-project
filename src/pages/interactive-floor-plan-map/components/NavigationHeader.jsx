import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NavigationHeader = ({ 
  selectedDepartment = "Computer Science",
  selectedTeacher = "Dr. Smith",
  currentFloor = 2,
  onBackClick = null
}) => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const departmentColors = {
    'Mechanical': '#EF4444',
    'Electrical': '#FBBF24', 
    'Computer Science': '#2563EB',
    'ECE': '#10B981',
    'Civil': '#8B5CF6'
  };

  const floorNames = {
    0: 'Ground Floor',
    1: '1st Floor', 
    2: '2nd Floor',
    3: '3rd Floor',
    4: '4th Floor'
  };

  const handleBackNavigation = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      navigate('/teacher-selection-interface');
    }
  };

  const handleLogoClick = () => {
    navigate('/teacher-selection-interface');
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden lg:flex fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200 h-16">
        <div className="flex items-center justify-between w-full px-6">
          {/* Logo Section */}
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-8 h-8 bg-blue-600 rounded-md flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">
                College Navigator
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                Interactive Floor Plan
              </p>
            </div>
          </button>

          {/* Current Selection & Controls */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-4">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: departmentColors?.[selectedDepartment] }}
              ></div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {selectedTeacher}
                </p>
                <p className="text-xs text-gray-500">
                  {selectedDepartment} • {floorNames?.[currentFloor]}
                </p>
              </div>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={handleBackNavigation}
            >
              Change Selection
            </Button>
          </div>
        </div>
      </header>
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between h-14 px-4">
          {/* Back Button & Title */}
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              iconName="ArrowLeft"
              onClick={handleBackNavigation}
            />
            <div>
              <h1 className="text-base font-semibold text-gray-900">
                Floor Plan
              </h1>
              <p className="text-xs text-gray-500 -mt-1">
                {floorNames?.[currentFloor]}
              </p>
            </div>
          </div>

          {/* Selection Summary Toggle */}
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: departmentColors?.[selectedDepartment] }}
              ></div>
              <span className="text-sm font-medium truncate max-w-[100px]">
                {selectedTeacher?.split(' ')?.[0]}
              </span>
            </div>
          </Button>
        </div>

        {/* Expandable Selection Details */}
        {isExpanded && (
          <div className="bg-gray-50 border-t border-gray-200 px-4 py-3 animate-slide-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: departmentColors?.[selectedDepartment] }}
                ></div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {selectedTeacher}
                  </p>
                  <p className="text-xs text-gray-500">
                    {selectedDepartment}
                  </p>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Edit"
                onClick={handleBackNavigation}
              >
                Change
              </Button>
            </div>
          </div>
        )}
      </header>
      {/* Mobile Spacer */}
      <div className={`lg:hidden ${isExpanded ? 'h-24' : 'h-14'}`}></div>
      {/* Desktop Spacer */}
      <div className="hidden lg:block h-16"></div>
    </>
  );
};

export default NavigationHeader;