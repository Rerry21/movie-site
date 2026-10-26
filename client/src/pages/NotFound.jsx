import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PageContainer from '../components/PageContainer'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
  padding: 56px 0;
`

const Tag = styled.span`
  padding: 4px 12px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.2rem);
  font-weight: 800;
  letter-spacing: -0.03em;
`

const Description = styled.p`
  max-width: 560px;
  color: ${({ theme }) => theme.colors.textMuted};
`

const Back = styled(Link)`
  margin-top: 8px;
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;

  &:hover {
    color: ${({ theme }) => theme.colors.accentHover};
  }
`

function NotFound() {
  return (
    <PageContainer>
      <Wrapper>
        <Tag>404</Tag>
        <Title>Page not found</Title>
        <Description>
          The page you are looking for does not exist.
        </Description>
        <Back to="/">Back to home</Back>
      </Wrapper>
    </PageContainer>
  )
}

export default NotFound