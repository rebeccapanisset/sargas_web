import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
`;

export const MainPainel = styled.div`
  background: ${Colors().gray};
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const Wrapper = styled.div`
  padding: 30px 20px;
  overflow: auto;
  height: 100vh;
`;
