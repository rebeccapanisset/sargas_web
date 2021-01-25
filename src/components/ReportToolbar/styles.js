import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const ContainerSearchBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0;
  flex: 1;

  form {
    display: flex;
    align-items: center;
    flex: 1;

    div {
      margin-bottom: 0;
    }

    & > div {
      margin: 0 2px;
    }
  }
`;
