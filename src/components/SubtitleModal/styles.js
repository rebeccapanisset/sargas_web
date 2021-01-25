import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div``;

export const ContainerNave = styled.div`
  margin-bottom: 15px;
`;

export const ExmapleSection = styled.div`
  background: ${Colors().gray};
  padding: 10px;
  margin: 10px 0;
`;

export const ResultExample = styled.div`
  background: ${Colors().info};
  padding: 10px;
  color: ${Colors(1).white};
  margin: 10px 0;
`;

export const TabBudget = styled.div`
  span {
    background: ${Colors().orange};
    color: ${Colors(1).white};
    padding: 5px;
  }
`;

export const TabClient = styled.div`
  span {
    background: ${Colors().primary};
    color: ${Colors(1).white};
    padding: 5px;
  }
`;

export const TabContract = styled.div`
  span {
    background: ${Colors().orange};
    color: ${Colors(1).white};
    padding: 5px;
  }

  div {
    margin: 10px 0;
    background: ${Colors(1).gray};
    padding: 10px;

    h4,
    h5 {
      margin-bottom: 10px;
    }
  }

  ol,
  ul {
    margin-left: 20px;
  }
`;

export const TabTruck = styled.div`
  span {
    background: ${Colors().success};
    color: ${Colors(1).white};
    padding: 5px;
  }
`;

export const TabProduct = styled.div`
  span {
    background: ${Colors().info};
    color: ${Colors(1).white};
    padding: 5px;
  }

  div {
    margin: 10px 0;
    background: ${Colors(1).gray};
    padding: 10px;

    h5 {
      margin-bottom: 10px;
    }
  }
`;

export const TabUser = styled.div`
  span {
    background: ${Colors().green};
    color: ${Colors(1).white};
    padding: 5px;
  }

  div {
    margin: 10px 0;
    background: ${Colors(1).gray};
    padding: 10px;

    h5 {
      margin-bottom: 10px;
    }
  }
`;

export const TabAccessories = styled.div`
  span {
    background: ${Colors().danger};
    color: ${Colors(1).white};
    padding: 5px;
  }

  ol,
  ul {
    margin-left: 20px;
  }

  table,
  th,
  td {
    border: 1px solid black;
  }
  table tr td,
  table tr th {
    padding-left: 5px;
    padding-right: 5px;
  }

  div {
    margin: 10px 0;
    background: ${Colors(1).gray};
    padding: 10px;

    h5 {
      margin-bottom: 10px;
    }
  }
`;

export const Signatures = styled.div`
  display: flex;
  flex-flow: row wrap;
  padding-bottom: 20px;

  & > div {
    width: calc(50% - 40px);
    border-bottom: 1px solid #000;
    display: block;
    padding-bottom: 10px;
    text-align: center;

    & + div {
      margin-left: 40px;
    }
  }
`;
