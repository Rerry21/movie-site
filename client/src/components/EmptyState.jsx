import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 56px 24px;
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px dashed ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
`

const IconWrap = styled.div`
  display: grid;
  place-items: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accentSoft};
  color: ${({ theme }) => theme.colors.accent};
`

const Title = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
`

const Message = styled.p`
  max-width: 420px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`

const Action = styled(Link)`
  margin-top: 8px;
  padding: 10px 22px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-size: 0.88rem;
  font-weight: 600;
  transition: background ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`

const DefaultIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="7" y1="4" x2="7" y2="20" />
    <line x1="17" y1="4" x2="17" y2="20" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
)

function EmptyState({ icon, title, message, actionLabel, actionTo }) {
  return (
    <Wrapper>
      <IconWrap>{icon || <DefaultIcon />}</IconWrap>
      <Title>{title}</Title>
      {message && <Message>{message}</Message>}
      {actionLabel && actionTo && <Action to={actionTo}>{actionLabel}</Action>}
    </Wrapper>
  )
}

export default EmptyState