import styled from 'styled-components';

export const Container = styled.div``;

export const FormContainer = styled.div`
  display: flex;
  flex-flow: row wrap;

  & > div {
    width: calc(50% - 10px);

    & + div {
      margin-left: 10px;
    }
  }
`;
