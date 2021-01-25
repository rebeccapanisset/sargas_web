import styled from 'styled-components';
import Button from '~/components/Button';

export const Container = styled.div``;

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

export const ActionButtons = styled.nav`
  display: flex;
  padding: 10px;
  justify-content: space-between;

  div {
    margin-top: 0;
  }
`;

export const ActionButton = styled(Button)``;
