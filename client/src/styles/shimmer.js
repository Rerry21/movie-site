import { css, keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`

export const shimmerStyle = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface} 25%,
    ${({ theme }) => theme.colors.surfaceHover} 37%,
    ${({ theme }) => theme.colors.surface} 63%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease infinite;
`