import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Colors from '~/styles/colors';

export const Container = styled.div`
  li div {
    margin-left: auto;
    display: flex;
  }
`;

export const MenuItem = styled(Link)`
  color: ${Colors(1).white};
  font-size: 12px;
  display: flex;
  align-items: center;
  border-radius: 4px;
  font-weight: 700;
  text-transform: uppercase;
  padding: 13px 10px;
  margin: 0 15px 0;
  transition: background 0.2s;

  span {
    width: 20px;
    text-align: center;
    margin-right: 10px;
  }

  &:hover {
    background: ${Colors(0.2).white};
  }
`;

export const SubMenu = styled.ul`
  transition: all 0.5s;
  display: ${(props) => (props.active ? 'block' : 'none')};
  visibility: ${(props) => (props.active ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.active ? 1 : 0)};
`;

export const Li = styled.li`
  display: ${(props) => (!props.show ? 'none' : 'block')};
`;
