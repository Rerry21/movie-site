import styled from 'styled-components'
import PageContainer from '../components/PageContainer.jsx'
import PageHeader from '../components/PageHeader.jsx'
import TitleGrid from '../components/TitleGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'
import useWatchlist from '../hooks/useWatchlist.js'

const Page = styled(PageContainer)`
  gap: 28px;
`

const Top = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  gap: 16px;
`

const ClearButton = styled.button`
  padding: 9px 20px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: transparent;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: color ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
    border-color: ${({ theme }) => theme.colors.danger};
  }
`

const BookmarkIcon = () => (
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
    <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4.5L5 21V4a1 1 0 0 1 1-1z" />
  </svg>
)

function Watchlist() {
  const { items, remove, clear } = useWatchlist()

  const handleClear = () => {
    if (window.confirm('Remove everything from your watchlist?')) {
      clear()
    }
  }

  if (items.length === 0) {
    return (
      <Page>
        <PageHeader
          title="Watchlist"
          description="Titles you save will be stored in this browser."
        />
        <EmptyState
          icon={<BookmarkIcon />}
          title="Your watchlist is empty"
          message="Tap Add to Watchlist on any movie or series and it will show up here. Your list stays in this browser, no account needed."
          actionLabel="Browse movies"
          actionTo="/movies"
        />
      </Page>
    )
  }

  return (
    <Page>
      <Top>
        <PageHeader
          title="Watchlist"
          description={`${items.length} saved ${items.length === 1 ? 'title' : 'titles'}`}
        />
        <ClearButton type="button" onClick={handleClear}>
          Clear all
        </ClearButton>
      </Top>
      <TitleGrid items={items} onRemove={(item) => remove(item.id)} />
    </Page>
  )
}

export default Watchlist