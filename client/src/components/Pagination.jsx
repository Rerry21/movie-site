import styled from 'styled-components'

const Wrapper = styled.nav`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
`

const Button = styled.button`
  padding: 10px 22px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transition},
    opacity ${({ theme }) => theme.transition};

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const Status = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.88rem;
`

function Pagination({ page, totalPages, onChange }) {
  if (totalPages <= 1) return null

  return (
    <Wrapper aria-label="Pagination">
      <Button type="button" disabled={page <= 1} onClick={() => onChange(page - 1)}>
        Previous
      </Button>
      <Status>
        Page {page} of {totalPages}
      </Status>
      <Button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onChange(page + 1)}
      >
        Next
      </Button>
    </Wrapper>
  )
}

export default Pagination