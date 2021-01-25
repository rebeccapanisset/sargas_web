import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div``;

export const BoxContent = styled.div`
  padding: 20px 0;
  background: ${Colors(1).white};
  border: 1px solid ${Colors().iceWhite};
  border-radius: 4px;
`;

export const HeaderContent = styled.div`
  ul {
    display: flex;

    li {
      flex: 1;
      background: ${Colors().gradient.frist};
      text-align: center;
      justify-content: center;
      padding: 7px 0;
      display: flex;
      color: ${Colors(1).white};
      border-radius: 4px;
    }
  }
`;

export const Content = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: row;

  & > div {
    flex-basis: 50%;
  }

  & > div + div {
    margin-left: 25px;
    padding-left: 25px;
    border-left: 1px solid ${Colors().info};
  }
`;

export const SetedSignature = styled.div`
  background: ${Colors().gray};
  padding: 10px;
  border-radius: 4px;
  display: flex;
  margin-top: 40px;
  flex-direction: column;

  strong {
    margin-bottom: 10px;
    color: ${Colors().primary};
  }

  img {
    width: 100px;
  }
`;
