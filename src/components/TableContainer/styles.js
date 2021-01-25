import styled, { css } from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
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
`;

export const Content = styled.span``;
