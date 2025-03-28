import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router';
import { AppContext } from '@/hooks/useAppContext';
import fetchWithAuth from '@/utils/fetchWithAuth';
import config from '@/config';


const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const [loginUsername, setLoginUsername] = useState(localStorage.getItem('username'));  
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = async () => {
    try {
      const response = await fetchWithAuth(`${config.apiBaseUrl}/api/auth/logout`, {
        method: 'POST'
      });

      if (response.ok) {
        setIsLoggedIn(false);
        setLoginUsername(null);
        localStorage.removeItem('username');
        localStorage.removeItem('isLoggedIn');
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <AppContext.Provider value={{
      loginUsername,
      setLoginUsername,
      isLoggedIn,
      setIsLoggedIn,
      handleLogin,
      handleLogout,
    }}>
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = { children: PropTypes.node };

export default AppProvider;
