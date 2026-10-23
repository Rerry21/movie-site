import styled from 'styled-components'

const Wrapper = styled.section`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 56px ${({ theme }) => theme.layout.gutter};
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 14px;
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

function pagePlaceholder({ title, description, tag = 'Placeholder' }) {
    return (
        <Wrapper>
            <Tag>{tag}</Tag>
            <Title>{title}</Title>
            {description && <Description>{description}</Description>}
        </Wrapper>
    )
}

export default pagePlaceholder