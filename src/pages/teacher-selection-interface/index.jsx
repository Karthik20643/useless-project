import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import AppHeader from '../../components/ui/AppHeader';
import RouteTransition from '../../components/ui/RouteTransition';
import WelcomeHeader from './components/WelcomeHeader';
import SelectionForm from './components/SelectionForm';
import QuickAccessCard from './components/QuickAccessCard';

const TeacherSelectionInterface = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Find Teacher - College Navigator</title>
        <meta name="description" content="Locate any teacher in the college building with our interactive floor plan navigation system. Select department and teacher to get visual directions." />
        <meta name="keywords" content="college navigation, teacher finder, floor plan, directions, campus map" />
      </Helmet>
      <RouteTransition>
        <div className="min-h-screen bg-background">
          {/* Header */}
          <AppHeader />

          {/* Main Content */}
          <div className="container mx-auto px-4 py-8 max-w-6xl">
            <div className="space-y-8">
              {/* Welcome Section */}
              <WelcomeHeader />

              {/* Main Selection Area */}
              <div className="grid lg:grid-cols-3 gap-8 items-start">
                {/* Selection Form - Main Focus */}
                <div className="lg:col-span-2 flex justify-center lg:justify-start">
                  <SelectionForm />
                </div>

                {/* Quick Access Sidebar */}
                <div className="lg:col-span-1">
                  <QuickAccessCard />
                </div>
              </div>

              {/* Additional Information */}
              <div className="mt-12 bg-card border border-border rounded-lg p-6 shadow-card">
                <div className="text-center space-y-4">
                  <h3 className="text-lg font-semibold text-text-primary">
                    How College Navigator Works
                  </h3>
                  
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <h4 className="font-medium text-text-primary">Select Department</h4>
                      <p className="text-sm text-text-secondary">
                        Choose from 5 engineering departments across different floors
                      </p>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <h4 className="font-medium text-text-primary">Choose Teacher</h4>
                      <p className="text-sm text-text-secondary">
                        Pick the faculty member you want to visit from the list
                      </p>
                    </div>
                    
                    <div className="text-center space-y-2">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <h4 className="font-medium text-text-primary">Follow Route</h4>
                      <p className="text-sm text-text-secondary">
                        Get visual directions with highlighted path on floor plan
                      </p>
                    </div>
                  </div>

                  {/* Building Features */}
                  <div className="mt-8 pt-6 border-t border-border">
                    <h4 className="font-medium text-text-primary mb-4">Building Features</h4>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-text-secondary">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Elevator Access</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Wheelchair Accessible</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Emergency Exits</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-success rounded-full"></div>
                        <span>Restroom Facilities</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="bg-card border-t border-border mt-16">
            <div className="container mx-auto px-4 py-6">
              <div className="text-center text-sm text-text-secondary">
                <p>&copy; {new Date()?.getFullYear()} College Navigator. All rights reserved.</p>
                <p className="mt-1">Engineering Block • 5 Floors • Smart Navigation System</p>
              </div>
            </div>
          </footer>
        </div>
      </RouteTransition>
    </>
  );
};

export default TeacherSelectionInterface;