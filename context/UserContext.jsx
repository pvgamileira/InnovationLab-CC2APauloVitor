'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userData, setUserData] = useState({ xp: 0, level: 1, premium: false });
  const [loading, setLoading] = useState(true);

  const refreshUserData = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) throw error;
      if (user?.user_metadata) {
        setUserData({
          xp: user.user_metadata.xp || 0,
          level: user.user_metadata.level || 1,
          premium: !!user.user_metadata.premium,
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, []);

  return (
    <UserContext.Provider value={{ userData, refreshUserData, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
}
