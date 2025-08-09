import React, { useState, useRef, useEffect, useMemo } from 'react';
import Icon from '../../../components/AppIcon';

const FloorPlanSVG = ({ 
  selectedDepartment = "Computer Science", 
  selectedTeacher = "teacher",
  currentFloor = 2,
  onRoomClick = null 
}) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [floor, setFloor] = useState(currentFloor);
  const svgRef = useRef(null);

  const departmentColors = {
    'Mechanical': '#EF4444', // red-500
    'Electrical': '#FBBF24', // amber-400
    'Computer Science': '#2563EB', // blue-600
    'ECE': '#10B981', // emerald-500
    'Civil': '#8B5CF6' // violet-500
  };

  const floorData = {
    0: { name: 'Ground Floor', department: 'Mechanical' },
    1: { name: '1st Floor', department: 'Electrical' },
    2: { name: '2nd Floor', department: 'Computer Science' },
    3: { name: '3rd Floor', department: 'ECE' },
    4: { name: '4th Floor', department: 'Civil' }
  };

  const teacherOffices = {
    0: { room: 'Mech Office', x: 520, y: 200 },
    1: { room: 'Elec Office', x: 520, y: 200 },
    2: { room: 'CS Office', x: 520, y: 200 },
    3: { room: 'ECE Office', x: 520, y: 200 },
    4: { room: 'Civil Office', x: 520, y: 200 }
  };

  const currentFloorDept = floorData[floor]?.department || selectedDepartment;
  const currentDepartmentColor = departmentColors[currentFloorDept] || '#2563EB';
  const targetOffice = teacherOffices[floor];

  const pathPoints = useMemo(() => {
    if (!targetOffice) return [];
    return [
      { x: 50, y: 350 }, // Entrance
      { x: 150, y: 350 },
      { x: 150, y: targetOffice.y },
      { x: targetOffice.x, y: targetOffice.y }
    ];
  }, [floor, targetOffice]);

  const pathString = pathPoints.map((point, index) => 
    `${index === 0 ? 'M' : 'L'} ${point.x} ${point.y}`
  ).join(' ');

  const handleZoomIn = () => setScale(prev => Math.min(prev * 1.2, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev / 1.2, 0.5));
  const handleResetView = () => { setScale(1); setPosition({ x: 0, y: 0 }); };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };
  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  const Room = ({ x, y, width, height, label, isTarget = false, isHighlighted = false }) => (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx="8"
        ry="8"
        fill={isTarget ? currentDepartmentColor : isHighlighted ? `${currentDepartmentColor}20` : '#FFFFFF'}
        stroke="#000000"
        strokeWidth="2"
        className={`transition-all duration-300 ${onRoomClick ? 'cursor-pointer hover:opacity-80' : ''}`}
        onClick={() => onRoomClick && onRoomClick(label)}
      />
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="12"
        fontWeight="500"
        fill={isTarget ? '#FFFFFF' : '#1E293B'}
        className="pointer-events-none select-none"
      >
        {label}
      </text>
    </g>
  );

  return (
    <div className="relative w-full h-full bg-slate-50 overflow-hidden">
      
      {/* Floor Switcher */}
      <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded shadow">
        {Object.entries(floorData).map(([num, info]) => (
          <button
            key={num}
            onClick={() => setFloor(parseInt(num))}
            className={`px-2 py-1 m-1 rounded text-xs ${
              floor === parseInt(num) ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {info.name}
          </button>
        ))}
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
        <button onClick={handleZoomIn} className="w-10 h-10 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-center hover:bg-gray-50">
          <Icon name="Plus" size={16} />
        </button>
        <button onClick={handleZoomOut} className="w-10 h-10 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-center hover:bg-gray-50">
          <Icon name="Minus" size={16} />
        </button>
        <button onClick={handleResetView} className="w-10 h-10 bg-white border border-gray-300 rounded-md shadow-sm flex items-center justify-center hover:bg-gray-50">
          <Icon name="Home" size={16} />
        </button>
      </div>

      {/* Floor Plan SVG */}
      <div className="w-full h-full cursor-grab active:cursor-grabbing" onMouseDown={handleMouseDown} style={{ cursor: isDragging ? 'grabbing' : 'grab' }}>
        <svg
          ref={svgRef}
          width="100%"
          height="100%"
          viewBox="0 0 800 500"
          className="transition-transform duration-200"
          style={{ transform: `translate(${position.x}px, ${position.y}px) scale(${scale})` }}
        >
          {/* Building Outline */}
          <rect x="20" y="50" width="760" height="400" rx="12" ry="12" fill="none" stroke="#000000" strokeWidth="3" />

          {/* Common Hall */}
          <Room x={40} y={80} width={300} height={340} label="Common Hall" isHighlighted={true} />

          {/* Right Side Rooms */}
          <Room x={380} y={80} width={80} height={80} label="Lift" />
          <Room x={480} y={80} width={120} height={80} label="Admin Office" />
          <Room x={620} y={80} width={140} height={80} label={`${currentFloorDept} Class 1`} isHighlighted={currentFloorDept === selectedDepartment} />
          <Room x={480} y={180} width={120} height={80} label={`${currentFloorDept} Office`} isTarget={currentFloorDept === selectedDepartment} />
          <Room x={380} y={180} width={80} height={80} label="Principal Office" />
          <Room x={380} y={280} width={120} height={80} label={`${currentFloorDept} Class 3`} isHighlighted={currentFloorDept === selectedDepartment} />
          <Room x={520} y={280} width={140} height={80} label={`${currentFloorDept} Class 4`} isHighlighted={currentFloorDept === selectedDepartment} />

          {/* Entrance Marker */}
          <g>
            <circle cx="50" cy="350" r="8" fill="#10B981" stroke="#FFFFFF" strokeWidth="2" />
            <text x="70" y="355" fontSize="12" fontWeight="600" fill="#10B981">Entrance</text>
          </g>

          {/* Navigation Path */}
          <path d={pathString} stroke="#FBBF24" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="8,4" className="animate-pulse" />

          {/* Path Direction Arrows */}
          {pathPoints.slice(1).map((point, index) => {
            const prevPoint = pathPoints[index];
            const angle = Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x);
            return (
              <polygon key={index} points="0,-4 8,0 0,4" fill="#FBBF24" transform={`translate(${point.x - 15}, ${point.y}) rotate(${angle * 180 / Math.PI})`} />
            );
          })}

          {/* Destination Marker */}
          {targetOffice && (
            <g>
              <circle cx={targetOffice.x} cy={targetOffice.y} r="10" fill="#EF4444" stroke="#FFFFFF" strokeWidth="2" className="animate-bounce" />
              <text x={targetOffice.x + 15} y={targetOffice.y + 5} fontSize="12" fontWeight="600" fill="#EF4444">
                {selectedTeacher}
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white border border-gray-300 rounded-lg p-3 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Entrance</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-1 bg-amber-400 rounded"></div>
            <span className="text-xs text-gray-600">Path</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs text-gray-600">Destination</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlanSVG;
