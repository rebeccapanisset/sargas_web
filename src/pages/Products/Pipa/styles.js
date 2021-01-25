import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  height: 100%;
  table {
    margin-top: 15px;

    thead tr {
      background: ${Colors(1).white};
    }
    tbody tr td:last-child {
      display: flex;

      button {
        margin: 0 5px;
      }
    }
  }

  & > div:last-child {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-width: 150px;
      margin-top: 50px;
    }
  }
`;
