import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background: ${(props) => props.theme["gray-900"]};
    color: #FFF;
  }

  border-style, input-security, textarea, button {
    font-size: 1rem;
    font-family: 'Roboto', sans-serif;
    font-weight: 400;
  }
`;
