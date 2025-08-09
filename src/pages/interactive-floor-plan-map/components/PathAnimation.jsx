import React, { useEffect, useState } from 'react';
import Icon from '../../../components/AppIcon';

const PathAnimation = ({ 
  isVisible = true,
  selectedTeacher = "Dr. Smith",
  estimatedTime = "3-5 minutes",
  onStartNavigation = null
}) => {
  const [animationStep, setAnimationStep] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  const navigationSteps = [
    "Enter through main entrance",
    "Walk straight to the lift area", 
    "Take lift to 2nd floor",
    "Turn right from lift",
    "Walk to Computer Science Office"
  ];

  useEffect(() => {
    if (!isVisible) return;

    const interval = setInterval(() => {
      setAnimationStep(prev => (prev + 1) % 4);
    }, 1000);

    return () => clearInterval(interval);
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 lg:bottom-6 lg:left-6 lg:right-auto lg:w-80 z-20">
      <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-50 px-4 py-3 border-b border-blue-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-blue-900">
                Navigation Active
              </span>
            </div>
            <button
              onClick={() => setShowInstructions(!showInstructions)}
              className="text-blue-600 hover:text-blue-800 transition-colors"
            >
              <Icon name={showInstructions ? "ChevronDown" : "ChevronUp"} size={16} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                <Icon name="MapPin" size={16} color="white" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900">
                Navigating to {selectedTeacher}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Computer Science Office • 2nd Floor
              </p>
              
              <div className="flex items-center space-x-4 mt-2">
                <div className="flex items-center space-x-1">
                  <Icon name="Clock" size={12} color="#6B7280" />
                  <span className="text-xs text-gray-500">{estimatedTime}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Navigation" size={12} color="#6B7280" />
                  <span className="text-xs text-gray-500">Follow yellow path</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-2 mt-4">
            <button
              onClick={onStartNavigation}
              className="flex-1 bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center space-x-1"
            >
              <Icon name="Play" size={14} />
              <span>Start Navigation</span>
            </button>
            <button className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Icon name="Share" size={14} color="#6B7280" />
            </button>
          </div>
        </div>

        {/* Expandable Instructions */}
        {showInstructions && (
          <div className="border-t border-gray-200 bg-gray-50 px-4 py-3">
            <h4 className="text-xs font-medium text-gray-700 uppercase tracking-wide mb-2">
              Step-by-step directions
            </h4>
            <div className="space-y-2">
              {navigationSteps?.map((step, index) => (
                <div key={index} className="flex items-start space-x-2">
                  <div className={`
                    w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                    ${index === animationStep 
                      ? 'bg-blue-600 text-white' :'bg-gray-200 text-gray-600'
                    }
                  `}>
                    {index + 1}
                  </div>
                  <p className={`text-xs ${
                    index === animationStep ? 'text-gray-900 font-medium' : 'text-gray-600'
                  }`}>
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PathAnimation;