import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

const USER_STORAGE_KEY = 'selectedUser';
const defaultUser = import.meta.env.VITE_DEFAULT_USER || "";

export const UserProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(
    localStorage.getItem(USER_STORAGE_KEY) || defaultUser
  );

  // This effect updates local storage whenever selectedUser changes
  useEffect(() => {
    if (selectedUser) {
      localStorage.setItem(USER_STORAGE_KEY, selectedUser);
    } else {
      localStorage.removeItem(USER_STORAGE_KEY);
    }
  }, [selectedUser]);

  return (
    <UserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </UserContext.Provider>
  );
};