import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  h4 {
    margin-bottom: 15px;
    background: ${Colors().clearWhite};
    padding: 5px 6px;
  }
`;

export const FormContainer = styled.div`
  display: grid;
  flex-flow: row wrap;
  grid-template-columns: 1fr 1fr;
  grid-gap: 25px;
`;

export const ClientDataSection = styled.div`
  width: 100%;
  margin-bottom: 20px;
`;

export const ContainerCompartments = styled.div`
  display: grid;
  grid-template-columns: ${(props) =>
    props.compartments === 1 ? '1fr' : '1fr 1fr'};
  grid-gap: 10px;
`;

export const ArialFields = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
`;
