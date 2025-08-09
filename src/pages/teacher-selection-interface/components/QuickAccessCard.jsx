import React from 'react';
import { useNavigate } from 'react-router-dom';

import Icon from '../../../components/AppIcon';

const QuickAccessCard = () => {
  const navigate = useNavigate();

  const quickAccessOptions = [
    {
      id: 'hod-offices',
      title: 'HOD Offices',
      description: 'Visit department heads',
      icon: 'Crown',
      color: 'bg-primary',
      teachers: [
        { name: 'Prof. Suresh Kumar', dept: 'Mechanical', code: 'prof-kumar', deptCode: 'mechanical' },
        { name: 'Prof. Ravi Verma', dept: 'Electrical', code: 'prof-verma', deptCode: 'electrical' },
        { name: 'Prof. Deepak Tiwari', dept: 'CS/IT', code: 'prof-tiwari', deptCode: 'cs-it' },
        { name: 'Prof. Ashok Dubey', dept: 'ECE', code: 'prof-dubey', deptCode: 'ece' },
        { name: 'Prof. Rajendra Singh', dept: 'Civil', code: 'prof-singh', deptCode: 'civil' }
      ]
    },
    {
      id: 'popular-teachers',
      title: 'Popular Teachers',
      description: 'Most visited faculty',
      icon: 'Star',
      color: 'bg-accent',
      teachers: [
        { name: 'Dr. Sanjay Agarwal', dept: 'CS/IT', code: 'dr-agarwal', deptCode: 'cs-it' },
        { name: 'Dr. Priya Patel', dept: 'Electrical', code: 'dr-patel', deptCode: 'electrical' },
        { name: 'Dr. Sunita Yadav', dept: 'ECE', code: 'dr-yadav', deptCode: 'ece' }
      ]
    }
  ];

  const handleQuickAccess = (teacher) => {
    const selectionData = {
      department: getDepartmentName(teacher?.deptCode),
      teacher: teacher?.name,
      departmentCode: teacher?.deptCode,
      teacherCode: teacher?.code
    };
    
    navigate('/interactive-floor-plan-map', { 
      state: selectionData 
    });
  };

  const getDepartmentName = (code) => {
    const departments = {
      'mechanical': 'Mechanical Engineering',
      'electrical': 'Electrical Engineering',
      'cs-it': 'Computer Science & IT',
      'ece': 'Electronics & Communication',
      'civil': 'Civil Engineering'
    };
    return departments?.[code] || code;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-text-primary mb-2">
          Quick Access
        </h3>
        <p className="text-sm text-text-secondary">
          Jump directly to frequently visited teachers
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {quickAccessOptions?.map((option) => (
          <div key={option?.id} className="bg-card border border-border rounded-lg p-4 shadow-card">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-10 h-10 ${option?.color} rounded-full flex items-center justify-center`}>
                <Icon name={option?.icon} size={20} color="white" />
              </div>
              <div>
                <h4 className="font-semibold text-text-primary">{option?.title}</h4>
                <p className="text-xs text-text-secondary">{option?.description}</p>
              </div>
            </div>

            <div className="space-y-2">
              {option?.teachers?.map((teacher, index) => (
                <button
                  key={`${teacher?.code}-${index}`}
                  onClick={() => handleQuickAccess(teacher)}
                  className="w-full flex items-center justify-between p-2 rounded-md hover:bg-muted transition-colors duration-fast text-left"
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={12} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-text-primary">{teacher?.name}</p>
                      <p className="text-xs text-text-secondary">{teacher?.dept}</p>
                    </div>
                  </div>
                  <Icon name="ArrowRight" size={16} className="text-text-secondary" />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      {/* Emergency Contacts */}
      <div className="bg-error/5 border border-error/20 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-3">
          <Icon name="Phone" size={16} className="text-error" />
          <h4 className="font-semibold text-error">Emergency Contacts</h4>
        </div>
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={14} className="text-error" />
            <div>
              <p className="font-medium text-text-primary">Security</p>
              <p className="text-text-secondary">Ext: 100</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Icon name="Heart" size={14} className="text-error" />
            <div>
              <p className="font-medium text-text-primary">Medical</p>
              <p className="text-text-secondary">Ext: 101</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessCard;