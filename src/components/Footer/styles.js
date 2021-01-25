import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  margin-top: auto;
  background: ${Colors(1).white};
  border-top: 1px solid ${Colors().iceWhite};
  padding: 15px 10px;
  font-weight: normal;
  display: flex;
  justify-content: flex-end;

  span {
    font-size: 13px;
  }
`;
