import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import StudentPage from './components/StudentPage/StudentPage.jsx';
import LoginForm from './components/LoginForm/LoginForm.jsx';

import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/api/login" element={<LoginForm />} />
      <Route path="/api/students" element={<StudentPage />} />
      <Route path="/" element={<Navigate to="/api/login" />} />
    </Routes>
  );
}

export default App;