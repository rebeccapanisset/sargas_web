import styled from 'styled-components';

export const Container = styled.div`
  & > div{
    display:flex;
    justify-content:center;
  }
`;

export const Loading = styled.div`
margin:10px 10px 0; 
 svg {
    animation: 2s rotation infinite linear;
  }

  @keyframes rotation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(359deg);
    }
  }
`;