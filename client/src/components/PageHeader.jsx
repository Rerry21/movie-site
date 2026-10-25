import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`

const Title = styled.h1`
  font-size: clamp(1.8rem, 5vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
`

const Description = styled.p`
  max-width: 560px;
  color: ${({ theme }) => theme.colors.textMuted};
`

function PageHeader({ title, description }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
    </Wrapper>
  )
}

export default PageHeader