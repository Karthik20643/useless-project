import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AppHeader = ({ selectionData = null, onBackNavigation = null }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMapScreen = location?.pathname === '/interactive-floor-plan-map';
  const isSelectionScreen = location?.pathname === '/teacher-selection-interface';

  const handleBackClick = () => {
    if (onBackNavigation) {
      onBackNavigation();
    } else {
      navigate('/teacher-selection-interface');
    }
  };

  const handleLogoClick = () => {
    navigate('/teacher-selection-interface');
    setIsMobileMenuOpen(false);
  };

  const navigationItems = [
    {
      label: 'Find Teacher',
      path: '/teacher-selection-interface',
      icon: 'Search',
      active: isSelectionScreen
    },
    {
      label: 'View Map',
      path: '/interactive-floor-plan-map',
      icon: 'Map',
      active: isMapScreen,
      disabled: !selectionData
    }
  ];

  const handleNavClick = (path, disabled) => {
    if (!disabled) {
      navigate(path);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-100 bg-surface border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <button
            onClick={handleLogoClick}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-fast"
          >
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Icon name="GraduationCap" size={20} color="white" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-text-primary">
                College Navigator
              </h1>
              <p className="text-xs text-text-secondary -mt-1">
                Find Your Way
              </p>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavClick(item?.path, item?.disabled)}
              disabled={item?.disabled}
              className={`
                flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium
                transition-all duration-fast
                ${item?.active 
                  ? 'bg-primary text-primary-foreground' 
                  : item?.disabled
                    ? 'text-muted-foreground cursor-not-allowed opacity-50'
                    : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                }
              `}
            >
              <Icon name={item?.icon} size={16} />
              <span>{item?.label}</span>
            </button>
          ))}
        </nav>

        {/* Desktop Selection Summary */}
        {selectionData && isMapScreen && (
          <div className="hidden lg:flex items-center space-x-4">
            <div className="text-right">
              <p className="text-sm font-medium text-text-primary">
                {selectionData?.teacher}
              </p>
              <p className="text-xs text-text-secondary">
                {selectionData?.department}
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              iconName="Edit"
              iconPosition="left"
              onClick={handleBackClick}
            >
              Change
            </Button>
          </div>
        )}

        {/* Mobile Back Button & Menu */}
        <div className="flex items-center space-x-2 md:hidden">
          {isMapScreen && (
            <Button
              variant="ghost"
              size="icon"
              iconName="ArrowLeft"
              onClick={handleBackClick}
            />
          )}
          <Button
            variant="ghost"
            size="icon"
            iconName="Menu"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          />
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-surface border-t border-border animate-slide-in">
          <nav className="px-4 py-3 space-y-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavClick(item?.path, item?.disabled)}
                disabled={item?.disabled}
                className={`
                  w-full flex items-center space-x-3 px-3 py-3 rounded-md text-sm font-medium
                  transition-all duration-fast
                  ${item?.active 
                    ? 'bg-primary text-primary-foreground' 
                    : item?.disabled
                      ? 'text-muted-foreground cursor-not-allowed opacity-50'
                      : 'text-text-secondary hover:text-text-primary hover:bg-muted'
                  }
                `}
              >
                <Icon name={item?.icon} size={18} />
                <span>{item?.label}</span>
                {item?.active && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </button>
            ))}
            
            {/* Mobile Selection Summary */}
            {selectionData && (
              <div className="mt-4 pt-3 border-t border-border">
                <div className="px-3 py-2">
                  <p className="text-xs text-text-secondary uppercase tracking-wide font-medium">
                    Current Selection
                  </p>
                  <p className="text-sm font-medium text-text-primary mt-1">
                    {selectionData?.teacher}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {selectionData?.department}
                  </p>
                </div>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default AppHeader;