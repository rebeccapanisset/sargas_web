import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  position: relative;
  img {
    display: block;
  }

  input {
    border: 1px solid ${Colors().info};
    padding: 8px 0 8px 8px;
    border-radius: 4px;
    margin-bottom: 10px;
    width: 100%;
    color: ${Colors().black};
  }

  > span {
    position: absolute;
    top: 28px;
    right: 10px;
    z-index: 9;
  }
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 12px;
  display: block;
`;
