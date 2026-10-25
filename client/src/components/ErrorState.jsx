import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 48px 24px;
  text-align: center;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px dashed rgba(229, 72, 77, 0.45);
  border-radius: ${({ theme }) => theme.radius.lg};
`

const IconWrap = styled.div`
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: rgba(229, 72, 77, 0.14);
  color: ${({ theme }) => theme.colors.danger};
`

const Title = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
`

const Message = styled.p`
  max-width: 420px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`

const RetryButton = styled.button`
  margin-top: 6px;
  padding: 10px 22px;
  border: 0;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`

const AlertIcon = () => (
  <svg
    width="26"
    height="26"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9" />
    <line x1="12" y1="8" x2="12" y2="12.5" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
)

function ErrorState({
  title = 'Something went wrong',
  message = 'We could not load this right now.',
  onRetry,
}) {
  return (
    <Wrapper role="alert">
      <IconWrap>
        <AlertIcon />
      </IconWrap>
      <Title>{title}</Title>
      <Message>{message}</Message>
      {onRetry && (
        <RetryButton type="button" onClick={onRetry}>
          Try again
        </RetryButton>
      )}
    </Wrapper>
  )
}

export default ErrorState