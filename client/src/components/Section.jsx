import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const Header = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
`

const Heading = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`

const Title = styled.h2`
  font-size: clamp(1.25rem, 3vw, 1.6rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    width: 4px;
    height: 1.1em;
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.accent};
  }
`

const Subtitle = styled.p`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.textMuted};
`

const SeeAll = styled(Link)`
  flex-shrink: 0;
  font-size: 0.85rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.accent};
  transition: color ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.accentHover};
  }
`

function Section({ title, subtitle, to, linkLabel = 'See all', children }) {
  return (
    <Wrapper>
      <Header>
        <Heading>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </Heading>
        {to && <SeeAll to={to}>{linkLabel} →</SeeAll>}
      </Header>
      {children}
    </Wrapper>
  )
}

export default Section