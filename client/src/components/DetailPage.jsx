import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PageContainer from './PageContainer.jsx'
import TitleHero from './TitleHero.jsx'
import DetailSkeleton from './DetailSkeleton.jsx'
import RelatedSection from './RelatedSection.jsx'
import WatchlistButton from './WatchlistButton.jsx'
import EmptyState from './EmptyState.jsx'
import ErrorState from './ErrorState.jsx'
import useApi from '../hooks/useApi.js'
import { endpoints } from '../services/api.js'

const COPY = {
  movie: {
    notFound: 'Movie not found',
    backTo: '/movies',
    backLabel: 'Browse movies',
    watchLabel: 'Watch Movie',
  },
  series: {
    notFound: 'Series not found',
    backTo: '/series',
    backLabel: 'Browse series',
    watchLabel: 'Watch Episode 1',
  },
}

const WatchLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 13px 28px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  font-size: 0.95rem;
  font-weight: 700;
  transition: background ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`

const PlayIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
  </svg>
)

function DetailPage({ kind, id, children }) {
  const isSeries = kind === 'series'
  const copy = COPY[kind]
  const path = isSeries ? endpoints.series(id) : endpoints.movie(id)
  const { data, loading, error, reload } = useApi(path)

  if (loading) return <DetailSkeleton />

  if (error?.status === 404 || error?.status === 400) {
    return (
      <PageContainer>
        <EmptyState
          title={copy.notFound}
          message="We could not find that title. It may have been removed or the link is wrong."
          actionLabel={copy.backLabel}
          actionTo={copy.backTo}
        />
      </PageContainer>
    )
  }

  if (error) {
    return (
      <PageContainer>
        <ErrorState message={error.message} onRetry={reload} />
      </PageContainer>
    )
  }

  if (!data) return null

  const watchTo = isSeries
    ? `/watch/series/${data.id}?season=1&episode=1`
    : `/watch/movie/${data.id}`

  return (
    <>
      <TitleHero
        item={data}
        actions={
          <>
            <WatchLink to={watchTo}>
              <PlayIcon />
              {copy.watchLabel}
            </WatchLink>
            <WatchlistButton item={data} />
          </>
        }
      />
      <PageContainer>
        {typeof children === 'function' ? children(data) : children}
        <RelatedSection id={data.id} kind={kind} />
      </PageContainer>
    </>
  )
}

export default DetailPage