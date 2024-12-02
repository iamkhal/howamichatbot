import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LoginForm } from './components/Auth/LoginForm';
import { SignupForm } from './components/Auth/SignupForm';
import { RoleSelection } from './components/RoleSelection';
import { ChatInterface } from './components/ChatInterface';
import { useState } from 'react';
import { UserRole } from './types';

function App() {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route
          path="/chat"
          element={
            selectedRole ? (
              <ChatInterface role={selectedRole} onBack={() => setSelectedRole(null)} />
            ) : (
              <RoleSelection onRoleSelect={setSelectedRole} />
            )
          }
        />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;