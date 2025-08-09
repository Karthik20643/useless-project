import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const RouteTransition = ({ children, isLoading = false }) => {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayLocation, setDisplayLocation] = useState(location);

  useEffect(() => {
    if (location !== displayLocation) {
      setIsTransitioning(true);
    }
  }, [location, displayLocation]);

  useEffect(() => {
    if (isTransitioning) {
      const timer = setTimeout(() => {
        setDisplayLocation(location);
        setIsTransitioning(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning, location]);

  const isMapRoute = location?.pathname === '/interactive-floor-plan-map';
  const isSelectionRoute = location?.pathname === '/teacher-selection-interface';

  return (
    <div className="relative min-h-screen">
      {/* Loading Overlay */}
      {(isLoading || isTransitioning) && (
        <div className="fixed inset-0 z-300 bg-background/80 backdrop-blur-sm flex items-center justify-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="w-12 h-12 border-4 border-muted rounded-full animate-spin border-t-primary"></div>
            </div>
            <div className="text-center">
              <p className="text-sm font-medium text-text-primary">
                {isMapRoute ? 'Loading floor plan...' : 'Loading...'}
              </p>
              <p className="text-xs text-text-secondary mt-1">
                {isMapRoute ? 'Calculating optimal route' : 'Please wait'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div 
        className={`
          transition-all duration-normal ease-in-out
          ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        `}
      >
        <main className="pt-16 min-h-screen bg-background">
          {children}
        </main>
      </div>

      {/* Route-specific Loading States */}
      {isLoading && isMapRoute && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-300">
          <div className="bg-surface border border-border rounded-lg px-4 py-3 shadow-card-hover">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 border-2 border-accent rounded-full animate-spin border-t-transparent"></div>
              <div className="text-sm">
                <p className="font-medium text-text-primary">Generating route</p>
                <p className="text-xs text-text-secondary">Finding the best path</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Progress Indicator for Multi-step Process */}
      {(isSelectionRoute || isMapRoute) && (
        <div className="fixed bottom-0 left-0 right-0 z-100 bg-surface border-t border-border md:hidden">
          <div className="flex items-center justify-center py-2">
            <div className="flex items-center space-x-2">
              <div className={`
                w-2 h-2 rounded-full transition-colors duration-fast
                ${isSelectionRoute ? 'bg-primary' : 'bg-muted'}
              `}></div>
              <div className={`
                w-8 h-0.5 transition-colors duration-fast
                ${isMapRoute ? 'bg-primary' : 'bg-muted'}
              `}></div>
              <div className={`
                w-2 h-2 rounded-full transition-colors duration-fast
                ${isMapRoute ? 'bg-primary' : 'bg-muted'}
              `}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RouteTransition;