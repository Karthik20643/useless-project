import React, { useState } from 'react';

import Button from './Button';

const SelectionSummary = ({ 
  department = null, 
  teacher = null, 
  onEditSelection = null,
  className = "",
  variant = "desktop" // "desktop" | "mobile" | "overlay"
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!department || !teacher) {
    return null;
  }

  const handleEditClick = () => {
    if (onEditSelection) {
      onEditSelection();
    }
  };

  const getDepartmentColor = (dept) => {
    const colorMap = {
      'Computer Science': 'department-blue',
      'Mathematics': 'department-green',
      'Physics': 'department-purple',
      'Chemistry': 'department-red',
      'Biology': 'department-yellow',
    };
    return colorMap?.[dept] || 'bg-muted';
  };

  // Desktop Header Integration
  if (variant === "desktop") {
    return (
      <div className={`hidden lg:flex items-center space-x-4 ${className}`}>
        <div className="flex items-center space-x-3">
          <div className={`w-3 h-3 rounded-full ${getDepartmentColor(department)}`}></div>
          <div className="text-right">
            <p className="text-sm font-medium text-text-primary">
              {teacher}
            </p>
            <p className="text-xs text-text-secondary">
              {department}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="Edit"
          iconPosition="left"
          onClick={handleEditClick}
        >
          Change
        </Button>
      </div>
    );
  }

  // Mobile Overlay/Bottom Sheet
  if (variant === "overlay") {
    return (
      <div className={`lg:hidden ${className}`}>
        {/* Trigger Button */}
        <Button
          variant="outline"
          size="sm"
          iconName={isExpanded ? "ChevronDown" : "ChevronUp"}
          iconPosition="right"
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full justify-between"
        >
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getDepartmentColor(department)}`}></div>
            <span className="text-sm font-medium">{teacher}</span>
          </div>
        </Button>

        {/* Expanded Content */}
        {isExpanded && (
          <div className="mt-2 p-4 bg-surface border border-border rounded-md shadow-card animate-slide-in">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className={`w-4 h-4 rounded-full ${getDepartmentColor(department)} mt-0.5`}></div>
                <div className="flex-1">
                  <p className="font-medium text-text-primary">{teacher}</p>
                  <p className="text-sm text-text-secondary">{department}</p>
                </div>
              </div>
              
              <div className="flex space-x-2 pt-2 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  iconPosition="left"
                  onClick={handleEditClick}
                  className="flex-1"
                >
                  Change Selection
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setIsExpanded(false)}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mobile Compact (for use in mobile header)
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className={`w-2 h-2 rounded-full ${getDepartmentColor(department)}`}></div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">
          {teacher}
        </p>
        <p className="text-xs text-text-secondary truncate">
          {department}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        iconName="Edit"
        onClick={handleEditClick}
      />
    </div>
  );
};

export default SelectionSummary;