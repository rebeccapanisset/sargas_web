import React from 'react';
import {useAuth} from '~/contexts/auth';


// import { Container } from './styles';

export default function Dashboard() {
  const { user } = useAuth();
 
  return (
    <>
      <h1>Olá, {user?.name}</h1>
 
    </>
  );
}
