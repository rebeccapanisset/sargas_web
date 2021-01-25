import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  background: ${Colors(1).white};
  border-bottom: 1px solid ${Colors().iceWhite};
  padding: 15px 10px;
  font-weight: normal;
  display: flex;
  justify-content: space-between;
`;

export const Breadcrumb = styled.h2`
  color: ${Colors().black};
`;

export const Asside = styled.aside`
  position: relative;
  color: ${Colors().black};
  display: flex;
  align-items: center;
  justify-content: center;

  & > a {
    display: block;
    cursor: pointer;
    transition: color 0.2s;
    color: ${Colors().black};
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      margin-left: 5px;
    }

    &:hover {
      color: ${Colors().gradient.frist};
    }
  }
`;

export const SubMenu = styled.div`
  transition: all 0.2s;
  visibility: ${(props) => (props.show ? 'visible' : 'hidden')};
  opacity: ${(props) => (props.show ? 1 : 0)};
  background: ${Colors(1).white};
  position: absolute;
  width: 100%;
  border-radius: 4px;
  margin-top: 80px;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.125);
  z-index: 999;

  ul {
    margin-bottom: 0;
  }

  li {
    cursor: pointer;
    display: flex;

    a {
      display: flex;
      padding: 10px 0 0;
      padding: 10px;
      width: 100%;
      align-items: center;
      color: ${Colors().black};
      border-radius: 4px;

      &:hover {
        background: ${Colors(0.5).gradient.frist};

        justify-content: flex-start;
        color: ${Colors(1).white};
        text-decoration: none;
      }

      svg {
        margin-right: 5px;
      }
    }
  }
`;
