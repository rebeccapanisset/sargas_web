import styled from 'styled-components';
import Colors from '~/styles/colors';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Options = styled.div`
  flex: 1;
  background: ${Colors().clearWhite};
  border-radius: 4px;
  border: 1px solid ${Colors().opacityBlack};

  div + div {
    max-height: 300px;
    min-height: 250px;
    overflow: auto;
  }
`;

export const Search = styled.div`
  background: ${Colors(1).white};
  margin-bottom: 5px;
  border-radius: 4px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    margin-right: 10px;
  }
`;

export const Iten = styled.a`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  width: 100%;
  cursor: pointer;

  &:hover {
    opacity: 0.6;
    cursor: pointer;
  }

  & + a {
    border-top: 1px solid ${Colors(0.1).opacityBlack};
  }
`;

export const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;

  svg {
    color: ${Colors().green};
  }
`;

export const SelectedItens = styled.div`
  flex: 1;
  background: ${Colors().clearWhite};
  padding: 0 0 10px 0;
  border-radius: 4px;
  border: 1px solid ${Colors().opacityBlack};

  div + div {
    max-height: 250px;
    min-height: 250px;
    overflow: auto;
  }
`;

export const HeaderSelected = styled.div`
  background: ${Colors(1).green};
  margin-bottom: 5px;
  border-radius: 4px 4px 0 0;
  width: 100%;
  display: flex;
  color: ${Colors(1).white};
  justify-content: center;
  align-items: center;
  height: 35px;
  font-weight: bold;
`;

export const SarchInput = styled.input`
  border: none;
  padding: 8px 6px;
  border-radius: 4px;
  flex: 1;
`;
