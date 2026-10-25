import styled, { css, keyframes } from 'styled-components'

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`

const shimmerStyle = css`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface} 25%,
    ${({ theme }) => theme.colors.surfaceHover} 37%,
    ${({ theme }) => theme.colors.surface} 63%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s ease infinite;
`

const Inner = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 48px ${({ theme }) => theme.layout.gutter} 56px;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 40px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    padding-top: 28px;
  }
`

const Poster = styled.div`
  width: 100%;
  max-width: 280px;
  aspect-ratio: 2 / 3;
  border-radius: ${({ theme }) => theme.radius.lg};
  ${shimmerStyle}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 200px;
    justify-self: center;
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const Line = styled.div`
  height: ${({ $height }) => $height || '14px'};
  width: ${({ $width }) => $width || '100%'};
  border-radius: 8px;
  ${shimmerStyle}
`

function DetailSkeleton() {
  return (
    <Inner aria-hidden="true">
      <Poster />
      <Info>
        <Line $width="90px" $height="12px" />
        <Line $width="60%" $height="44px" />
        <Line $width="40%" />
        <Line $width="50%" $height="28px" />
        <Line />
        <Line $width="92%" />
        <Line $width="70%" />
        <Line $width="180px" $height="46px" />
      </Info>
    </Inner>
  )
}

export default DetailSkeleton