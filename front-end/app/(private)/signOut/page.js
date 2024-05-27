'use client';
import { useEffect } from 'react';
import { removeToken } from '@/middleware';

const signOut = () => {
  useEffect(() => {
    removeToken();
  }, []);
};

export default signOut;
