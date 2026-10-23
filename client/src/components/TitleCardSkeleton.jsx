import styled, {css, keyframes } from 'styled-components'

const shimmer = keyframes`
  0 { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`

const shimmerStyle = css`
  background: liner-gradient(
    90deg,
    ${({ theme }) => theme.colors.surface} 25%,
    ${({ theme }) => theme.color.surfaceHover} 37%,
    ${({ theme }) => theme.colors.surface} 63%
  );
  background-size: 200% 100%;
  animations: ${shimmer} 1.5s ease infinite;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const PosterBlock = styled.div`
  aspect-ratio: 2 / 3;
  border-radius: ${({ theme }) => theme.radius.md};
  ${shimmerStyle}
`

const Line = styled.div`
  height: ${({ $height }) => $height || '12px'};
  width: ${({ $width }) => $width || '100%'};
  border-radius: 6px;
  ${shimmerStyle}
`

function TitleCardSkeleton() {
    return (
        <Wrapper aria-hidden="true">
            <PosterBlock />
            <Line $width="80%" $height="14px" />
            <Line $width="45%" />
        </Wrapper>
    )
}

export default TitleCardSkeleton