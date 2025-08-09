import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NavigationHeader from './components/NavigationHeader';
import FloorPlanSVG from './components/FloorPlanSVG';
import FloorSelector from './components/FloorSelector';
import PathAnimation from './components/PathAnimation';

const InteractiveFloorPlanMap = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get selection data from navigation state or use defaults
  const selectionData = location?.state?.selectionData || {
    department: "Computer Science",
    teacher: "Dr. Smith"
  };

  const [currentFloor, setCurrentFloor] = useState(2);
  const [isLoading, setIsLoading] = useState(true);
  const [showPathAnimation, setShowPathAnimation] = useState(true);

  // Department to floor mapping
  const departmentFloorMap = {
    'Mechanical': 0,
    'Electrical': 1,
    'Computer Science': 2,
    'ECE': 3,
    'Civil': 4
  };

  // Mock teacher data for realistic experience
  const teacherData = {
    'Mechanical': [
      'Dr. Rajesh Kumar', 'Prof. Anita Sharma', 'Dr. Vikram Singh', 'Prof. Meera Patel'
    ],
    'Electrical': [
      'Dr. Suresh Reddy', 'Prof. Kavita Joshi', 'Dr. Amit Gupta', 'Prof. Priya Nair'
    ],
    'Computer Science': [
      'Dr. Smith', 'Prof. Sarah Johnson', 'Dr. Michael Brown', 'Prof. Lisa Davis'
    ],
    'ECE': [
      'Dr. Ravi Verma', 'Prof. Sunita Rao', 'Dr. Kiran Kumar', 'Prof. Deepa Singh'
    ],
    'Civil': [
      'Dr. Ashok Mehta', 'Prof. Rekha Agarwal', 'Dr. Sanjay Jain', 'Prof. Neha Gupta'
    ]
  };

  useEffect(() => {
    // Redirect if no selection data
    if (!selectionData?.department || !selectionData?.teacher) {
      navigate('/teacher-selection-interface');
      return;
    }

    // Set initial floor based on department
    const targetFloor = departmentFloorMap?.[selectionData?.department];
    if (targetFloor !== undefined) {
      setCurrentFloor(targetFloor);
    }

    // Simulate loading time for realistic experience
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(loadingTimer);
  }, [selectionData, navigate]);

  const handleFloorChange = (floor) => {
    setCurrentFloor(floor);
  };

  const handleBackNavigation = () => {
    navigate('/teacher-selection-interface', {
      state: { 
        previousSelection: selectionData 
      }
    });
  };

  const handleRoomClick = (roomLabel) => {
    console.log(`Clicked on room: ${roomLabel}`);
    // Could implement room details modal or additional navigation
  };

  const handleStartNavigation = () => {
    // Could implement AR navigation or detailed step-by-step guide
    console.log('Starting navigation to:', selectionData?.teacher);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
          <div>
            <p className="text-lg font-medium text-gray-900">Loading floor plan...</p>
            <p className="text-sm text-gray-500 mt-1">
              Calculating route to {selectionData?.teacher}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navigation Header */}
      <NavigationHeader
        selectedDepartment={selectionData?.department}
        selectedTeacher={selectionData?.teacher}
        currentFloor={currentFloor}
        onBackClick={handleBackNavigation}
      />
      {/* Main Content Area */}
      <div className="flex h-screen pt-16 lg:pt-16">
        {/* Desktop Floor Selector Sidebar */}
        <FloorSelector
          variant="desktop"
          currentFloor={currentFloor}
          onFloorChange={handleFloorChange}
          selectedDepartment={selectionData?.department}
        />

        {/* Floor Plan Display */}
        <div className="flex-1 relative">
          <FloorPlanSVG
            selectedDepartment={selectionData?.department}
            selectedTeacher={selectionData?.teacher}
            currentFloor={currentFloor}
            onRoomClick={handleRoomClick}
          />

          {/* Mobile Floor Selector */}
          <FloorSelector
            variant="mobile"
            currentFloor={currentFloor}
            onFloorChange={handleFloorChange}
            selectedDepartment={selectionData?.department}
          />

          {/* Path Animation & Navigation Controls */}
          <PathAnimation
            isVisible={showPathAnimation}
            selectedTeacher={selectionData?.teacher}
            estimatedTime="3-5 minutes"
            onStartNavigation={handleStartNavigation}
          />
        </div>
      </div>
      {/* Emergency/Help Button */}
      <button className="fixed bottom-4 right-4 lg:bottom-6 lg:right-6 w-12 h-12 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors z-30">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </button>
    </div>
  );
};

export default InteractiveFloorPlanMap;