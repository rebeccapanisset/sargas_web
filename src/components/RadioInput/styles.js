import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  & > div {
    display: flex;
  }
`;

export const LabelInput = styled.label`
  font-size: 12px;
  display: flex;
  margin: 0 5px;
  justify-content: center;
  align-items: center;

  span {
    margin-left: 5px;
  }
`;

export const Label = styled.label`
  font-size: 12px;
  font-weight: bold;
  margin: 0 5px;
  margin-bottom: 10px;
`;
