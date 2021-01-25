import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: ${(props) => props.aligment};
  margin: ${(prop) => prop.margin};
`;

export const ComponentLink = styled(Link)`
  display: flex;
  border: none;
  padding: 8px 10px;
  border-radius: 4px;
  background: ${(props) => props.bg};
  color: ${Colors(1).white};
  margin: 0 3px;
  height: 40px;
  align-items: center;

  &:hover {
    opacity: 0.8;
    color: #fff;
  }
`;
