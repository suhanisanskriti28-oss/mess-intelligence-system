import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null); // 'student' or 'admin'
  const [loading, setLoading] = useState(true);

  // Sign up
  const signup = async (email, password, name, role = 'student') => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const user = { uid: Date.now().toString(), email, name };
        
        // Save user to "users" table in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push({ ...user, role, password }); // Store password simply for mock auth
        localStorage.setItem('users', JSON.stringify(users));
        
        // Log them in
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('userRole', role);
        setCurrentUser(user);
        setUserRole(role);
        
        resolve(user);
      }, 500);
    });
  };

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
          const { password: _, ...safeUser } = user;
          localStorage.setItem('currentUser', JSON.stringify(safeUser));
          localStorage.setItem('userRole', user.role);
          setCurrentUser(safeUser);
          setUserRole(user.role);
          resolve(safeUser);
        } else {
          // If no user is found, reject
          reject(new Error("Invalid email or password"));
        }
      }, 500);
    });
  };

  const logout = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('userRole');
        setCurrentUser(null);
        setUserRole(null);
        resolve();
      }, 200);
    });
  };

  useEffect(() => {
    // Check local storage for persistent session
    const storedUser = localStorage.getItem('currentUser');
    const storedRole = localStorage.getItem('userRole');
    
    if (storedUser && storedRole) {
      setCurrentUser(JSON.parse(storedUser));
      setUserRole(storedRole);
    }
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    userRole,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
