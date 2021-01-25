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

  textarea {
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

export const ActionButtons = styled.div`
  height: 100%;
  position: absolute;
  right: 0;
  background: ${(props) => (props.action ? Colors().blue : Colors().white)};
  border-radius: 0 4px 4px 0;
  border-left: ${(props) =>
    props.action ? `1px solid ${Colors().info}` : Colors().white};
  padding: 0 5px;
`;

export const ActionIcon = styled.button`
  border: none;
  padding: 3px;
  height: 100%;
  background: none;
  outline: none;

  svg {
    transition: margin-top 0.3s;
    color: ${Colors().danger};
  }

  &:hover > svg {
    margin-top: -4px;
  }
`;
