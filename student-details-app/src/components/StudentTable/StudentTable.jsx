import React from 'react';
import './StudentTable.css';

function StudentTable({ students, onEdit, onDelete }) {
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Course</th>
          <th>Date of Joining</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {students.length > 0 ? (
          students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.course}</td>
              <td>{new Date(student.dateOfJoining).toLocaleDateString()}</td>
              <td>
                <button className="edit-btn" onClick={() => onEdit(student)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(student.id)}>Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">No student data available.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export default StudentTable;