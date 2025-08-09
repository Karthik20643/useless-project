import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import DepartmentSelector from './DepartmentSelector';
import TeacherSelector from './TeacherSelector';

const SelectionForm = () => {
  const navigate = useNavigate();
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState('');
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedDepartment) {
      newErrors.department = 'Please select a department';
    }
    
    if (!selectedTeacher) {
      newErrors.teacher = 'Please select a teacher';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleFindTeacher = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    
    // Simulate loading time for better UX
    setTimeout(() => {
      const selectionData = {
        department: getDepartmentName(selectedDepartment),
        teacher: getTeacherName(selectedTeacher),
        departmentCode: selectedDepartment,
        teacherCode: selectedTeacher
      };
      
      // Navigate to map with selection data
      navigate('/interactive-floor-plan-map', { 
        state: selectionData 
      });
      setIsLoading(false);
    }, 1500);
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

  const getTeacherName = (code) => {
    const teacherNames = {
      'dr-sharma': 'Dr. Rajesh Sharma',
      'prof-gupta': 'Prof. Anita Gupta',
      'dr-singh': 'Dr. Vikram Singh',
      'prof-kumar': 'Prof. Suresh Kumar',
      'dr-patel': 'Dr. Priya Patel',
      'prof-mehta': 'Prof. Amit Mehta',
      'dr-joshi': 'Dr. Neha Joshi',
      'prof-verma': 'Prof. Ravi Verma',
      'dr-agarwal': 'Dr. Sanjay Agarwal',
      'prof-mishra': 'Prof. Kavita Mishra',
      'dr-pandey': 'Dr. Rohit Pandey',
      'prof-tiwari': 'Prof. Deepak Tiwari',
      'dr-yadav': 'Dr. Sunita Yadav',
      'prof-saxena': 'Prof. Manoj Saxena',
      'dr-shukla': 'Dr. Pooja Shukla',
      'prof-dubey': 'Prof. Ashok Dubey',
      'dr-tripathi': 'Dr. Ramesh Tripathi',
      'prof-srivastava': 'Prof. Geeta Srivastava',
      'dr-chandra': 'Dr. Vijay Chandra',
      'prof-singh': 'Prof. Rajendra Singh'
    };
    return teacherNames?.[code] || code;
  };

  const handleReset = () => {
    setSelectedDepartment('');
    setSelectedTeacher('');
    setErrors({});
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card rounded-lg border border-border p-6 shadow-card">
        <div className="space-y-6">
          {/* Form Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="Search" size={24} className="text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-text-primary">
              Find Your Teacher
            </h2>
            <p className="text-sm text-text-secondary">
              Select department and teacher to get directions
            </p>
          </div>

          {/* Department Selection */}
          <DepartmentSelector
            selectedDepartment={selectedDepartment}
            onDepartmentChange={(value) => {
              setSelectedDepartment(value);
              setSelectedTeacher(''); // Reset teacher when department changes
              setErrors(prev => ({ ...prev, department: null }));
            }}
            error={errors?.department}
          />

          {/* Teacher Selection */}
          <TeacherSelector
            selectedDepartment={selectedDepartment}
            selectedTeacher={selectedTeacher}
            onTeacherChange={(value) => {
              setSelectedTeacher(value);
              setErrors(prev => ({ ...prev, teacher: null }));
            }}
            error={errors?.teacher}
          />

          {/* Action Buttons */}
          <div className="space-y-3 pt-4">
            <Button
              variant="default"
              size="lg"
              fullWidth
              loading={isLoading}
              iconName="Navigation"
              iconPosition="left"
              onClick={handleFindTeacher}
              disabled={!selectedDepartment || !selectedTeacher}
            >
              {isLoading ? 'Finding Route...' : 'Find Teacher'}
            </Button>

            {(selectedDepartment || selectedTeacher) && (
              <Button
                variant="outline"
                size="default"
                fullWidth
                iconName="RotateCcw"
                iconPosition="left"
                onClick={handleReset}
                disabled={isLoading}
              >
                Reset Selection
              </Button>
            )}
          </div>

          {/* Help Text */}
          <div className="mt-6 p-4 bg-muted rounded-md">
            <div className="flex items-start space-x-3">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-medium text-text-primary mb-1">
                  How it works:
                </p>
                <ul className="text-xs text-text-secondary space-y-1">
                  <li>• Choose your department from the dropdown</li>
                  <li>• Select the teacher you want to visit</li>
                  <li>• Get visual directions on the floor plan</li>
                  <li>• Follow the highlighted path to reach the office</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectionForm;