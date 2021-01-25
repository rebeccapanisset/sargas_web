import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  display: block;
  margin: 0px 2px 5px;
  padding: 0 5px;
  font-size: 13px;
  position: relative;
  margin-top: 7px;
  font-weight: 700;

  svg {
    color: ${Colors().danger};
  }

  span {
    width: 140px;
    background: ${Colors().danger};
    padding: 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
    opacity: 0;
    transition: opacity 0.4s;
    visibility: hidden;
    color: ${Colors(1).white};
    text-align: center;
    position: absolute;
    bottom: calc(100% + 14px);
    right: 0;

    color: ${Colors().iceWhite};

    &::before {
      border-style: solid;
      border-color: ${Colors().danger} transparent;
      border-width: 6px 6px 0 6px;
      content: '';
      top: 100%;
      position: absolute;
      right: 6px;
    }
  }

  &:hover span {
    opacity: 1;
    visibility: visible;
  }
`;
