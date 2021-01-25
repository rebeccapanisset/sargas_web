import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to bottom,
    ${Colors().gradient.frist} 0%,
    ${Colors().gradient.third} 50%,
    ${Colors().gradient.second} 100%
  );
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FormContainer = styled.div`
  width: 360px;
  border-radius: 5px;
  display: flex;
  background: ${Colors().white};
  flex-direction: column;

  form > div {
    padding: 15px 20px 20px;

    a {
      font-size: 12px;
      margin-top: 5px;
      color: ${Colors().black};
      float: right;
    }
  }

  h2 {
    margin-bottom: 15px;
    color: ${Colors().black};
  }

  input {
    border: none;
    background: none;
    border-radius: 4px;
    width: 100%;
    color: ${Colors().black};

    &::placeholder {
      color: ${Colors().black};
    }
  }

  button {
    margin-top: 15px;
    border: none;
    padding: 10px 15px;
    width: 100%;
    display: block;
    background: ${Colors().green};
    color: ${Colors(1).white};
    font-weight: 600;
    font-size: 16px;
    border-radius: 0 0 4px 4px;
    transition: background 0.2s;

    &:hover {
      background: ${Colors().darkGreen};
    }
  }
`;

export const Image = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  margin-top: -60px;

  & > div {
    width: 120px;
    border-radius: 50%;
    background: ${Colors(1).white};
    padding: 15px;
    box-shadow: 0 0 5px 1px ${Colors().opacityBlack};
  }

  img {
    max-width: 100%;
  }
`;
