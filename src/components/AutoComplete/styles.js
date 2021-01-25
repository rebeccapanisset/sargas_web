import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  position: relative;
`;

export const InputContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border: 1px solid ${Colors().info};
  border-radius: 4px;
  margin-bottom: 10px;

  input {
    display: block;
    width: 100%;
    padding: 0;
    border: none;
    padding: 8px;
    border-radius: 4px;
  }
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 12px;
`;

export const Content = styled.div`
  display: ${(props) => (props.active ? 'flex' : 'none')};
  position: absolute;
  flex-direction: row;
  width: 100%;
  background: ${Colors(1).white};
  justify-content: space-between;
  border: 1px solid ${Colors().gray};
  box-shadow: 0px 1px 3px 0px ${Colors().opacityBlack};
  border-radius: 0 0 4px 4px;
  max-height: 240px;
  overflow: auto;
  margin-top: 2px;
  cursor: pointer;
  z-index: 9;
`;

export const ItemContent = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

export const Item = styled.a`
  display: flex;
  align-items: center;
  padding: 10px;
  transition: background 0.2s;
  border: none;
  background: none;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  & + a {
    border-top: 1px solid ${Colors().clearWhite};
  }

  strong {
    font-size: 16px;
    margin-bottom: 5px;
    display: block;
    font-weight: 700;
  }

  &:hover {
    background: ${Colors().clearWhite};
  }
`;

export const NotHaveContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;

  div {
    flex: 1;
    padding: 10px;
  }
`;

export const AddNewButton = styled.button`
  border: none;
  padding: 10px;
  height: 100%;
  background: none;

  svg {
    color: ${Colors().green};
  }
`;

export const AutoContent = styled.div``;
