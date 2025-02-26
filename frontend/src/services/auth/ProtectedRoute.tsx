import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserRole } from '@/types/user';

interface ProtectedRouteProps {
  children: React.ReactNode;
  userRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, userRole }) => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  useEffect(() => {
    if (!user || !user.access_token) {
      navigate('/login', { replace: true });
    } else if (userRole && user.role !== userRole) {
      navigate('/', { replace: true });
    }
  }, [navigate, user, userRole]);

  if (user?.access_token && (!userRole || user.role === userRole)) {
    return React.createElement(React.Fragment, null, children);
  }

  return null;
};

export default ProtectedRoute;