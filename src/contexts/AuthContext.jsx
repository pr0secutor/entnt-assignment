import { createContext, useState, useEffect } from 'react';
import { localStorageUtils } from '../utils/localStorageUtils';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorageUtils.getData('user');
    if (savedUser) setUser(savedUser);
    setLoading(false);
  }, []);

  const login = (email, password) => {
    const users = localStorageUtils.getData('users');
    const foundUser = users.find(u => u.email === email && u.password === password);
    if (foundUser) {
      setUser(foundUser);
      localStorageUtils.setData('user', foundUser);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorageUtils.setData('user', null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};