import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '~/components/Menu';
import { Container, Logo, Wrapper } from './styles';

export default function Sidebar() {
  return (
    <Container>
      <Logo>
        <Link to="/dashboard">
          <span>Sargas</span>
        </Link>
      </Logo>
      <Wrapper>
        <Menu />
      </Wrapper>
    </Container>
  );
}
