// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Overview from './pages/Overview.jsx';
import Expenses from './pages/Expenses.jsx';
import Settings from './pages/Settings.jsx';

import { ProtectedRoute } from './components/ProtectedRoute.jsx';
import { PublicRoute } from './components/PublicRoute.jsx';


const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />

        {/* Protected Dashboard */}
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Catch all unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
