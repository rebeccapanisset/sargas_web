import styled, { css } from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  position: relative;
  display: flex;
  border: 1px solid ${Colors().info};
  background: ${Colors(0.5).white};

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

  > svg {
    margin-top: 12px;
    margin-left: 10px;
  }

  border-radius: 4px;
  margin-bottom: 10px;

  color: ${Colors().black};

  input {
    padding: 8px 0 8px 8px;
    border: none;
    border-radius: 4px;
    flex: 1;
    &::placeholder {
      color: ${Colors().black};
    }
  }
`;

export const Label = styled.label`
  font-weight: 700;
  font-size: 12px;
`;

export const Loading = styled.div`
  position: absolute;
  right: 10px;
  top: 6px;

  svg {
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
