import React, { useState, useEffect } from 'react';
import './StudentForm.css';
const initialFormState = {
  name: '',
  email: '',
  course: '',
  dateOfJoining: '',
};

function StudentForm({ onSubmit, onCancel, initialData }) {
  const isEditing = !!initialData;
  const [formData, setFormData] = useState(initialFormState);
  
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setFormData(initialData);
    } else {
      setFormData(initialFormState);
    }
  }, [initialData, isEditing]);

  const handleCancel = () => {
    setIsClosing(true); 
    setTimeout(() => {
      onCancel();
    }, 400);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handlePanelClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="form-modal-overlay" onClick={handleCancel}>
      <div 
        className={`form-modal-panel ${isClosing ? 'closing' : ''}`} 
        onClick={handlePanelClick}
      >
        <div className="form-modal-content">
          <h2>{isEditing ? 'Edit Student Course' : 'Add New Student'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              disabled={isEditing}
              required={!isEditing}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              disabled={isEditing}
              required={!isEditing}
            />
            <input
              type="date"
              name="dateOfJoining"
              value={formData.dateOfJoining}
              onChange={handleChange}
              disabled={isEditing}
              required={!isEditing}
            />
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
              required
            />
            <div className="form-buttons">
              <button type="submit">{isEditing ? 'Update Course' : 'Add Student'}</button>
              <button type="button" onClick={handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default StudentForm;