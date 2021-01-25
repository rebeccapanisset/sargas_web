import styled from 'styled-components';
import Colors from '~/styles/colors';
import FileInput from '~/components/FileInput';

export const Container = styled.div``;

export const FormContainer = styled.div`
  display: flex;
  flex-flow: row wrap;

  & > div {
    width: calc(50% - 10px);

    & + div {
      margin-left: 10px;
    }
  }
`;

export const FileInputContainer = styled.div`
  background: ${Colors().gray};
  padding: 10px 20px;

  h6 {
    width: 100%;
    background: ${Colors().gray};

    font-weight: bold;
    margin-bottom: 10px;
  }
`;

export const FileInputBox = styled.div`
  margin: 0 0 40px;
`;

export const SetedImage = styled.div`
  background: ${Colors().gray};
  padding: 10px;
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  strong {
    margin-bottom: 10px;
    color: ${Colors().primary};
  }

  img {
    width: 300px;
  }
`;

export const InputFile = styled(FileInput)`
  img {
    width: 300px;
  }
`;
