import styled, { css } from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  border: 1px solid ${Colors().info};
  border-radius: 4px;
  margin-bottom: 10px;
  overflow: hidden;

  ${(props) =>
    props.isFocused &&
    css`
      border: 1px solid ${Colors().green};
    `}

  ${(props) =>
    props.isErrored &&
    css`
      border: 1px solid ${Colors().danger};
    `}

  > span {
    position: absolute;
    top: 4px;
    right: 40px;
    z-index: 9;
  }

  input {
    height: 2.4rem;
    font-size: 14px;
    padding: 0 0.5rem;
    border: none;
    width: 100%;

    &::placeholder {
      font-size: 0.9rem;
      color: ${Colors().opacityBlack};
    }
  }
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 12px;
`;
