// Import necessary modules and components
'use client';
import React, { createContext, useContext, useState } from 'react';

// Create a Context for managing global application state
const AppContext = createContext();

// Custom hook to access the AppContext
export const useAppContext = () => {
  return useContext(AppContext);
};

// AppProvider component to provide the AppContext to its children
export const AppProvider = ({ children }) => {
  // State variables for cart item number and notification count
  const [cartItemNumber, setCartItemNumber] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);

  // Function to update cart item number
  const addingToCart = (number) => setCartItemNumber(prev => prev + number);
  
  // Function to update notification count
  const addNotification = (number) => setNotificationCount(prev => prev + number);

  return (
    // Provide cart item number, addingToCart function, notification count, and addNotification function to children via AppContext
    <AppContext.Provider value={{
      cartItemNumber, 
      addingToCart, 
      notificationCount, 
      addNotification
    }}>
      {children}
    </AppContext.Provider>
  );
};
