import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  
  *{
    margin:0;
    padding:0;
    outline:0;
    box-sizing:border-box;    
  }

  *:focus{
    outline:0;
  }

  html, body, #root{
    height:100vh;
  }
  h1,h2,h3,h4,h5,h6{
    margin:0;
    padding:0;
  }

  body{
    -webkit-font-smoothing:antialiased;
  }
  body, input, button{
    font:15px 'Montserrat', sans-serif;
  }

  a{
    text-decoration:none!important;
    
    &:hover{
      color:initial;
    }

  }

  ul{
    list-style:none;
  }

  button{
    cursor:pointer;
  }

`;
