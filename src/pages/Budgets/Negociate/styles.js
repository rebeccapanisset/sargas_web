import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  background: ${Colors(0.7).white};
  padding: 10px 20px;
  border-radius: 4px;
`;

export const FormContainer = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 20px;

  & > div {
    width: calc(50% - 10px);

    & + div {
      margin-left: 10px;
    }
  }
`;
