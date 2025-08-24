
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  currentUser: User | null;
  user: User | null; // Add user alias for compatibility
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

// Mock auth service for admin
const mockAuth = {
  signIn: async (email: string, password: string): Promise<User> => {
    // Simple mock authentication - in real app, this would make API calls
    if (email === 'admin@miraj.com' && password === 'admin123') {
      const user: User = {
        id: 'admin-1',
        email,
        displayName: 'Admin User',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      localStorage.setItem('admin-user', JSON.stringify(user));
      return user;
    }
    throw new Error('Invalid credentials');
  },
  
  signOut: async (): Promise<void> => {
    localStorage.removeItem('admin-user');
  },
  
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('admin-user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    const user = await mockAuth.signIn(email, password);
    setCurrentUser(user);
  };

  const logout = async () => {
    await mockAuth.signOut();
    setCurrentUser(null);
  };

  useEffect(() => {
    // Check for existing user on mount
    const user = mockAuth.getCurrentUser();
    setCurrentUser(user);
    setLoading(false);
  }, []);

  const value = {
    currentUser,
    user: currentUser, // Add user alias for compatibility
    login,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
