"use client";
import React, { useEffect } from 'react';
import { useAuth } from '../../context/auth_context';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const { logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    logout();
    router.push('/login');

  }, []);

  return (
    <>
    </>
  );
};

export default Logout;
