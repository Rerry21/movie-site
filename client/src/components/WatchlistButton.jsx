import styled from 'styled-components'
import useWatchlist from '../hooks/useWatchlist.js'

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 24px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid
    ${({ $active, theme }) =>
      $active ? theme.colors.accent : 'rgba(255, 255, 255, 0.25)'};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.accentSoft : 'rgba(255, 255, 255, 0.06)'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.accent : theme.colors.text};
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: border-color ${({ theme }) => theme.transition},
    background ${({ theme }) => theme.transition},
    color ${({ theme }) => theme.transition};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

const BookmarkIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z" />
  </svg>
)

function WatchlistButton({ item }) {
  const { has, toggle } = useWatchlist()
  const saved = has(item.id)

  return (
    <Button
      type="button"
      $active={saved}
      aria-pressed={saved}
      onClick={() => toggle(item)}
    >
      <BookmarkIcon filled={saved} />
      {saved ? 'In Watchlist' : 'Add to Watchlist'}
    </Button>
  )
}

export default WatchlistButton