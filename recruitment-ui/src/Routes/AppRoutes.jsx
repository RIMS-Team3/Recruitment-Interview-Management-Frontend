import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import JobList from '../pages/JobList';
import SavedJobs from '../pages/SavedJobs';
import ApplicationList from '../Applications/ApplicationList';
import ProtectedRoute from '../Auth/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/jobs" element={<JobList />} />

      {/* Chặn nếu chưa login */}
      <Route path="/saved-jobs"element={<ProtectedRoute><SavedJobs />
          </ProtectedRoute>
        }
      />
      
      <Route
        path="/employer/applications"element={<ProtectedRoute><ApplicationList />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/jobs" replace />} />
    </Routes>
  );
};

export default AppRoutes;