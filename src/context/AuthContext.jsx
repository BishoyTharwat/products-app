import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false); 

  const register = async (userData) => {
    const res = await fetch('https://dummyjson.com/users/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!res.ok) {
      throw new Error('Registration failed. Please check your network connection.');
    }

    const newCreatedUser = await res.json();
    localStorage.setItem('locallyRegisteredUser', JSON.stringify({
      ...newCreatedUser,
      password: userData.password
    }));

    return newCreatedUser;
  };

  const login = async (username, password) => {
    const localUserRaw = localStorage.getItem('locallyRegisteredUser');
    if (localUserRaw) {
      const localUser = JSON.parse(localUserRaw);
      
      if (localUser.username === username && localUser.password === password) {
        const authenticatedLocalUser = {
          id: localUser.id,
          username: localUser.username,
          email: localUser.email,
          firstName: localUser.firstName,
          lastName: localUser.lastName,
          accessToken: "mock-jwt-token-xyz-999" 
        };

        localStorage.setItem('token', authenticatedLocalUser.accessToken);
        localStorage.setItem('user', JSON.stringify(authenticatedLocalUser));
        setToken(authenticatedLocalUser.accessToken);
        setUser(authenticatedLocalUser);
        return authenticatedLocalUser;
      }
    }

    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      throw new Error('Invalid credentials. Hint: Check your spelling or use "emilys" / "emilyspass"');
    }

    const data = await res.json();
    localStorage.setItem('token', data.accessToken);
    localStorage.setItem('user', JSON.stringify(data));
    setToken(data.accessToken);
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};