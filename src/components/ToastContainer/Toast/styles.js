import styled, { css } from 'styled-components';
import { animated } from 'react-spring';
import Colors from '~/styles/colors';

const toastTypeVariations = {
  info: css`
    background: ${Colors().blue};
    color: ${Colors().primary};
  `,
  success: css`
    background: ${Colors().success};
    color: ${Colors(1).white};
  `,
  error: css`
    background: ${Colors().danger};
    color: ${Colors(1).white};
  `,
};

export const Container = styled(animated.div)`
  width: 370px;
  position: relative;
  padding: 16px 30px 16px 16px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  border-radius: 10px;

  z-index: 9;
  display: flex;

  & + div {
    margin-top: 15px;
  }

  ${(props) => toastTypeVariations[props.type || 'info']}

  > svg {
    margin: 4px 12px 0 0;
  }

  div {
    flex: 1;

    p {
      margin-top: 4px;
      font-size: 14px;
      opacity: 0.8;
      line-height: 20px;
      margin-bottom: 0;
    }
  }

  button {
    position: absolute;
    right: 16px;
    top: 19px;
    border: 0;
    background: transparent;
    color: inherit;
    outline: 0;
  }
`;
