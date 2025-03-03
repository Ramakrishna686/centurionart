import { Navigate } from 'react-router-dom';
import { authService } from '../services/authService';

export const AuthGuard = ({ children }) => {
  const user = authService.getCurrentUser();
  
  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export const RoleGuard = ({ children, roles }) => {
  const user = authService.getCurrentUser();
  
  if (!user || !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};