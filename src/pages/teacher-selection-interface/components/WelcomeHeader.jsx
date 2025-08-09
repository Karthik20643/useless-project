import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = () => {
  const currentTime = new Date()?.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });

  const currentDate = new Date()?.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="text-center space-y-4 mb-8">
      {/* Welcome Message */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
          Welcome to College Navigator
        </h1>
        <p className="text-text-secondary text-sm md:text-base max-w-md mx-auto">
          Find any teacher's office quickly with our interactive floor plan system
        </p>
      </div>
      {/* Current Time & Date */}
      <div className="flex items-center justify-center space-x-4 text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={14} />
          <span>{currentTime}</span>
        </div>
        <div className="w-1 h-1 bg-text-secondary rounded-full"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={14} />
          <span className="hidden sm:inline">{currentDate}</span>
          <span className="sm:hidden">{new Date()?.toLocaleDateString()}</span>
        </div>
      </div>
      {/* Building Info */}
      <div className="bg-card border border-border rounded-lg p-4 max-w-lg mx-auto">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
            <Icon name="Building2" size={20} className="text-primary" />
          </div>
          <div className="text-left">
            <h3 className="font-semibold text-text-primary">Engineering Block</h3>
            <p className="text-xs text-text-secondary">5 Floors • 5 Departments</p>
          </div>
        </div>
        
        {/* Floor Layout */}
        <div className="grid grid-cols-5 gap-2 text-xs">
          <div className="text-center p-2 bg-red-50 border border-red-200 rounded">
            <div className="w-2 h-2 bg-red-500 rounded-full mx-auto mb-1"></div>
            <div className="font-medium text-red-700">Ground</div>
            <div className="text-red-600">Mechanical</div>
          </div>
          <div className="text-center p-2 bg-yellow-50 border border-yellow-200 rounded">
            <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto mb-1"></div>
            <div className="font-medium text-yellow-700">1st Floor</div>
            <div className="text-yellow-600">Electrical</div>
          </div>
          <div className="text-center p-2 bg-blue-50 border border-blue-200 rounded">
            <div className="w-2 h-2 bg-blue-600 rounded-full mx-auto mb-1"></div>
            <div className="font-medium text-blue-700">2nd Floor</div>
            <div className="text-blue-600">CS/IT</div>
          </div>
          <div className="text-center p-2 bg-green-50 border border-green-200 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full mx-auto mb-1"></div>
            <div className="font-medium text-green-700">3rd Floor</div>
            <div className="text-green-600">ECE</div>
          </div>
          <div className="text-center p-2 bg-purple-50 border border-purple-200 rounded">
            <div className="w-2 h-2 bg-purple-500 rounded-full mx-auto mb-1"></div>
            <div className="font-medium text-purple-700">4th Floor</div>
            <div className="text-purple-600">Civil</div>
          </div>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="flex items-center justify-center space-x-6 text-xs text-text-secondary">
        <div className="flex items-center space-x-1">
          <Icon name="Users" size={14} />
          <span>20+ Teachers</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="MapPin" size={14} />
          <span>50+ Rooms</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Navigation" size={14} />
          <span>Smart Routing</span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;