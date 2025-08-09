import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const TeacherSelector = ({ 
  selectedDepartment,
  selectedTeacher, 
  onTeacherChange, 
  disabled = false,
  error = null 
}) => {
  const teacherData = {
    'mechanical': [
      { value: 'dr-sharma', label: 'Dr. Rajesh Sharma', description: 'Professor - Room ME-102', office: 'ME-102' },
      { value: 'prof-gupta', label: 'Prof. Anita Gupta', description: 'Associate Professor - Room ME-103', office: 'ME-103' },
      { value: 'dr-singh', label: 'Dr. Vikram Singh', description: 'Assistant Professor - Room ME-104', office: 'ME-104' },
      { value: 'prof-kumar', label: 'Prof. Suresh Kumar', description: 'Head of Department - Room ME-101', office: 'ME-101' }
    ],
    'electrical': [
      { value: 'dr-patel', label: 'Dr. Priya Patel', description: 'Professor - Room EE-202', office: 'EE-202' },
      { value: 'prof-mehta', label: 'Prof. Amit Mehta', description: 'Associate Professor - Room EE-203', office: 'EE-203' },
      { value: 'dr-joshi', label: 'Dr. Neha Joshi', description: 'Assistant Professor - Room EE-204', office: 'EE-204' },
      { value: 'prof-verma', label: 'Prof. Ravi Verma', description: 'Head of Department - Room EE-201', office: 'EE-201' }
    ],
    'cs-it': [
      { value: 'dr-agarwal', label: 'Dr. Sanjay Agarwal', description: 'Professor - Room CS-302', office: 'CS-302' },
      { value: 'prof-mishra', label: 'Prof. Kavita Mishra', description: 'Associate Professor - Room CS-303', office: 'CS-303' },
      { value: 'dr-pandey', label: 'Dr. Rohit Pandey', description: 'Assistant Professor - Room CS-304', office: 'CS-304' },
      { value: 'prof-tiwari', label: 'Prof. Deepak Tiwari', description: 'Head of Department - Room CS-301', office: 'CS-301' }
    ],
    'ece': [
      { value: 'dr-yadav', label: 'Dr. Sunita Yadav', description: 'Professor - Room EC-402', office: 'EC-402' },
      { value: 'prof-saxena', label: 'Prof. Manoj Saxena', description: 'Associate Professor - Room EC-403', office: 'EC-403' },
      { value: 'dr-shukla', label: 'Dr. Pooja Shukla', description: 'Assistant Professor - Room EC-404', office: 'EC-404' },
      { value: 'prof-dubey', label: 'Prof. Ashok Dubey', description: 'Head of Department - Room EC-401', office: 'EC-401' }
    ],
    'civil': [
      { value: 'dr-tripathi', label: 'Dr. Ramesh Tripathi', description: 'Professor - Room CE-502', office: 'CE-502' },
      { value: 'prof-srivastava', label: 'Prof. Geeta Srivastava', description: 'Associate Professor - Room CE-503', office: 'CE-503' },
      { value: 'dr-chandra', label: 'Dr. Vijay Chandra', description: 'Assistant Professor - Room CE-504', office: 'CE-504' },
      { value: 'prof-singh', label: 'Prof. Rajendra Singh', description: 'Head of Department - Room CE-501', office: 'CE-501' }
    ]
  };

  const availableTeachers = selectedDepartment ? teacherData?.[selectedDepartment] || [] : [];

  const formatTeacherOption = (teacher) => (
    <div className="flex items-center space-x-3 py-1">
      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
        <Icon name="User" size={14} className="text-primary" />
      </div>
      <div className="flex-1">
        <p className="font-medium text-text-primary">{teacher?.label}</p>
        <p className="text-xs text-text-secondary">{teacher?.description}</p>
      </div>
    </div>
  );

  const customTeacherOptions = availableTeachers?.map(teacher => ({
    ...teacher,
    customLabel: formatTeacherOption(teacher)
  }));

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-2">
        <Icon name="Users" size={18} className="text-primary" />
        <label className="text-sm font-medium text-text-primary">
          Select Teacher
        </label>
      </div>
      <Select
        options={customTeacherOptions}
        value={selectedTeacher}
        onChange={onTeacherChange}
        placeholder={selectedDepartment ? "Choose a teacher..." : "Select department first"}
        disabled={disabled || !selectedDepartment}
        error={error}
        searchable
        className="w-full"
      />
      {!selectedDepartment && (
        <div className="mt-2 p-3 bg-warning/10 border border-warning/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="Info" size={16} className="text-warning" />
            <p className="text-xs text-warning">
              Please select a department first to view available teachers
            </p>
          </div>
        </div>
      )}
      {selectedTeacher && selectedDepartment && (
        <div className="mt-3 p-3 bg-success/10 border border-success/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-success" />
            <div className="flex-1">
              <p className="text-xs font-medium text-success">
                Teacher selected: {availableTeachers?.find(t => t?.value === selectedTeacher)?.label}
              </p>
              <p className="text-xs text-success/80">
                Office: {availableTeachers?.find(t => t?.value === selectedTeacher)?.office}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherSelector;