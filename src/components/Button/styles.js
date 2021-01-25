import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  justify-content: ${(props) => props.aligment};
  margin: ${(prop) => prop.margin};
  align-items: center;
`;

export const ComponentButton = styled.button`
  display: flex;
  border: none;
  padding: 8px 10px;
  border-radius: 4px;
  background: ${(props) => props.bg};
  color: ${Colors(1).white};
  margin: 0 3px;
  height: 40px;

  &:hover {
    opacity: 0.8;
  }
`;

export const Loading = styled.div`
  background: ${(props) => props.bg};
  padding: 8px 10px;
  color: ${Colors(1).white};
  font-size: 13px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 4px;

  svg {
    margin-left: 7px;
    animation: 2s rotation infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;
