import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  height: 100vh;
  background: linear-gradient(
    to bottom,
    ${Colors().gradient.frist} 0%,
    ${Colors().gradient.third} 50%,
    ${Colors().gradient.second} 100%
  );
  width: 260px;
`;

export const Logo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-bottom: 1px solid ${Colors().iceWhite};

  a {
    text-transform: uppercase;
    color: ${Colors(1).white};
    font-weight: 700;
    font-size: 18px;
    display: block;
    padding: 15px;
    width: 100%;
    text-align: center;
  }
`;

export const Wrapper = styled.div`
  overflow: auto;
  width: 100%;
  margin-top: 20px;
`;
