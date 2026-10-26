import { Link } from 'react-router-dom'
import styled from 'styled-components'
import EmptyState from './EmptyState.jsx'
import ErrorState from './ErrorState.jsx'
import useApi from '../hooks/useApi.js'
import { endpoints } from '../services/api.js'
import { shimmerStyle } from '../styles/shimmer.js'
import { formatDate } from '../utils/format.js'

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Row = styled(Link)`
  display: grid;
  grid-template-columns: 48px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 16px;
  padding: 14px 18px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: border-color ${({ theme }) => theme.transition},
    background ${({ theme }) => theme.transition};

  &:hover {
    border-color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 32px minmax(0, 1fr) auto;
    gap: 12px;
    padding: 12px 14px;
  }
`

const Number = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 1.05rem;
  font-weight: 700;
  text-align: center;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

const Name = styled.h3`
  font-size: 0.95rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Meta = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
`

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #ffc857;
  font-size: 0.85rem;
  font-weight: 700;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    display: none;
  }
`

const PlayCircle = styled.span`
  display: grid;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
`

const SkeletonRow = styled.div`
  height: 68px;
  border-radius: ${({ theme }) => theme.radius.md};
  ${shimmerStyle}
`

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
  </svg>
)

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
  </svg>
)

function EpisodeList({ seriesId, season }) {
  const { data, loading, error, reload } = useApi(
    endpoints.season(seriesId, season)
  )

  if (loading) {
    return (
      <List aria-hidden="true">
        {Array.from({ length: 6 }, (_, index) => (
          <SkeletonRow key={index} />
        ))}
      </List>
    )
  }

  if (error?.status === 404 || error?.status === 400) {
    return (
      <EmptyState
        title="No episodes found"
        message="There are no episodes listed for this season yet."
      />
    )
  }

  if (error) {
    return <ErrorState message={error.message} onRetry={reload} />
  }

  const episodes = (data?.episodes || []).filter(
    (episode) => typeof episode.episode === 'number'
  )

  if (episodes.length === 0) {
    return (
      <EmptyState
        title="No episodes found"
        message="There are no episodes listed for this season yet."
      />
    )
  }

  return (
    <List>
      {episodes.map((episode) => {
        const date = formatDate(episode.released)
        const hasRating = typeof episode.rating === 'number' && episode.rating > 0

        return (
          <Row
            key={episode.id || episode.episode}
            to={`/watch/series/${seriesId}?season=${season}&episode=${episode.episode}`}
            aria-label={`Watch episode ${episode.episode}: ${episode.title}`}
          >
            <Number>{episode.episode === 0 ? 'SP' : episode.episode}</Number>
            <Info>
              <Name>{episode.title}</Name>
              {date && <Meta>{date}</Meta>}
            </Info>
            {hasRating ? (
              <Rating>
                <StarIcon />
                {episode.rating.toFixed(1)}
              </Rating>
            ) : (
              <span />
            )}
            <PlayCircle>
              <PlayIcon />
            </PlayCircle>
          </Row>
        )
      })}
    </List>
  )
}

export default EpisodeList