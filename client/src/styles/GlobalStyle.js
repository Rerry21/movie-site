import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  html {
    -webkit-text-size-adjust: 100%;
  }

  body {
    margin: 0;
    background: ${({ theme }) => theme.colors.bg};
    color: ${({ theme }) => theme.colors.text};
    font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, p {
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  button, input {
    font: inherit;
  }

  img {
    display: block;
    max-width: 100%;
  }

  ::selection {
    background: ${({ theme }) => theme.colors.accent};
    color: #fff;
  }

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.bg};
  }

  ::-webkit-scrollbar-thumb {
    background: #2a2a38;
    border-radius: 10px;
  }
`

export default GlobalStyle