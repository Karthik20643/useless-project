import React, { useState } from 'react';
import FloorSelector from './FloorSelector'; 
import FloorPlanSVG from './FloorPlanSVG'; 
import NavigationHeader from './NavigationHeader'; 
import PathAnimation from './PathAnimation';

const FloorPlanPage = () => {
  // State is lifted to this parent component
  const [currentFloor, setCurrentFloor] = useState(2);
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Science");
  const [selectedTeacher, setSelectedTeacher] = useState("teacher");
  const [isNavigationActive, setIsNavigationActive] = useState(true);

  // This function will be passed to FloorSelector to update the state
  const handleFloorChange = (floor) => {
    setCurrentFloor(floor);
    // Logic to update the department based on the floor
    const floorData = {
      0: { name: 'Ground Floor', department: 'Mechanical' },
      1: { name: '1st Floor', department: 'Electrical' },
      2: { name: '2nd Floor', department: 'Computer Science' },
      3: { name: '3rd Floor', department: 'ECE' },
      4: { name: '4th Floor', department: 'Civil' }
    };
    setSelectedDepartment(floorData[floor].department);
  };

  const handleRoomClick = (roomName) => {
    console.log(`Room clicked: ${roomName}`);
    // You can add more logic here, like highlighting the room
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <NavigationHeader
        currentFloor={currentFloor}
        selectedDepartment={selectedDepartment}
        selectedTeacher={selectedTeacher}
      />
      
      <FloorSelector
        currentFloor={currentFloor}
        onFloorChange={handleFloorChange}
        selectedDepartment={selectedDepartment}
      />
      
      <main className="flex-1 overflow-hidden pt-14 lg:pt-0 flex">
        <FloorPlanSVG
          currentFloor={currentFloor}
          selectedDepartment={selectedDepartment}
          selectedTeacher={selectedTeacher}
          onRoomClick={handleRoomClick}
        />
      </main>

      <PathAnimation
        isVisible={isNavigationActive}
        selectedTeacher={selectedTeacher}
        onStartNavigation={() => console.log("Navigation started!")}
      />
    </div>
  );
};

export default FloorPlanPage;