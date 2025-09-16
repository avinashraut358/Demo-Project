import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import StudentForm from '../StudentForm/StudentForm.jsx';
import StudentTable from '../StudentTable/StudentTable.jsx';
import './StudentPage.css';

function StudentPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated !== 'true') {
      navigate('/api/login');
    }
  }, [navigate]); 

  const [students, setStudents] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetch('/api/students')
      .then(response =>{
        if (!response.ok) {
            navigate('/api/login'); 
            throw new Error('Not authenticated');
        }
        return response.json();
      })
      .then(data => setStudents(data))
      .catch(error => console.error("Error fetching students:", error));
  }, [navigate]);

  const handleLogout = () => {
    fetch('/api/logout', { method: 'POST' })
      .then(() => {
        localStorage.removeItem('isAuthenticated');
        navigate('/api/login');
      });
  };

  const handleAddStudent = (student) => {
    fetch('/api/students', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(student),
    })
      .then(response => response.json())
      .then(newStudent => {
        setStudents([...students, newStudent]);
        setIsFormVisible(false);
      })
      .catch(error => console.error("Error adding student:", error));
  };
  const handleUpdateStudent = (updatedStudent) => {
    fetch(`/api/students/${updatedStudent.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedStudent),
    })
      .then(response => response.json())
      .then(returnedStudent => {
        setStudents(students.map(s => (s.id === returnedStudent.id ? returnedStudent : s)));
        setEditingStudent(null);
        setIsFormVisible(false);
      })
      .catch(error => console.error("Error updating student:", error));
  };
  const handleDeleteStudent = (studentId) => {
    fetch(`/api/students/${studentId}`, { method: 'DELETE' })
      .then(() => {
        setStudents(students.filter(student => student.id !== studentId));
      })
      .catch(error => console.error("Error deleting student:", error));
  };
  const handleEditClick = (student) => {
    setEditingStudent(student);
    setIsFormVisible(true);
  };
  const handleAddNewClick = () => {
    setEditingStudent(null);
    setIsFormVisible(true);
  };
  const handleCancel = () => {
    setIsFormVisible(false);
    setEditingStudent(null);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Student Details</h1>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
      <StudentTable 
        students={students} 
        onEdit={handleEditClick} 
        onDelete={handleDeleteStudent} 
      />
      
      {!isFormVisible && (
        <button className="add-btn" onClick={handleAddNewClick}>
          Add New Student
        </button>
      )}

      {isFormVisible && (
        <StudentForm
          onSubmit={editingStudent ? handleUpdateStudent : handleAddStudent}
          onCancel={handleCancel}
          initialData={editingStudent}
        />
      )}
    </div>
  );
}

export default StudentPage;