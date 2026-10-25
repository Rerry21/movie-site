import styled from 'styled-components'
import TitleCard from './TitleCard.jsx'
import TitleCardSkeleton from './TitleCardSkeleton.jsx'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 28px 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px 12px;
  }
`

const Cell = styled.div`
  position: relative;
  min-width: 0;
`

const RemoveButton = styled.button`
  position: absolute;
  top: 44px;
  right: 10px;
  z-index: 2;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 0;
  border-radius: 50%;
  background: rgba(10, 10, 15, 0.8);
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.danger};
  }
`

const CloseIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

function TitleGrid({ items = [], loading = false, skeletonCount = 12, onRemove }) {
  if (loading) {
    return (
      <Grid>
        {Array.from({ length: skeletonCount }, (_, index) => (
          <TitleCardSkeleton key={index} />
        ))}
      </Grid>
    )
  }

  return (
    <Grid>
      {items.map((item) => (
        <Cell key={`${item.type}-${item.id}`}>
          <TitleCard item={item} />
          {onRemove && (
            <RemoveButton
              type="button"
              aria-label={`Remove ${item.title} from watchlist`}
              onClick={() => onRemove(item)}
            >
              <CloseIcon />
            </RemoveButton>
          )}
        </Cell>
      ))}
    </Grid>
  )
}

export default TitleGrid