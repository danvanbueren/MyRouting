import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../context/UserContext'; // Adjust the import path as necessary

const UserDropdown = () => {
  const { selectedUser, setSelectedUser } = useUser();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API}/api/users`);
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
  };

  return (
    <select value={selectedUser} onChange={handleUserChange}>
      <option value="">Select User</option>
      {users.map(user => (
        <option key={user.userId} value={user.userId}>
          {user.firstName} {user.lastName}
        </option>
      ))}
    </select>
  );
};

export default UserDropdown;    