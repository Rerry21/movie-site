import { Link } from 'react-router-dom'
import styled, { keyframes } from 'styled-components'
import PageContainer from '../components/PageContainer.jsx'
import PageHeader from '../components/PageHeader.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import useApi from '../hooks/useApi.js'
import { endpoints } from '../services/api.js'

const getHue = (slug) => {
  let hash = 0
  for (let i = 0; i < slug.length; i += 1) {
    hash = (hash * 31 + slug.charCodeAt(i)) % 360
  }
  return (hash * 137) % 360
}

const pulse = keyframes`
  0%, 100% { opacity: 0.55; }
  50% { opacity: 1; }
`

const Page = styled(PageContainer)`
  gap: 28px;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
`

const Tile = styled(Link)`
  display: flex;
  align-items: flex-end;
  aspect-ratio: 16 / 9;
  padding: 16px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  background: linear-gradient(
    135deg,
    hsl(${({ $hue }) => $hue}, 50%, 26%),
    hsl(${({ $hue }) => ($hue + 40) % 360}, 55%, 10%)
  );
  font-size: 1.1rem;
  font-weight: 700;
  transition: transform ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition};

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

const TileSkeleton = styled.div`
  aspect-ratio: 16 / 9;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.surface};
  animation: ${pulse} 1.4s ease infinite;
`

function Genres() {
  const { data, loading, error, reload } = useApi(endpoints.genres())
  const genres = Array.isArray(data) ? data : []

  let content

  if (error) {
    content = <ErrorState message={error.message} onRetry={reload} />
  } else if (loading) {
    content = (
      <Grid aria-hidden="true">
        {Array.from({ length: 8 }, (_, index) => (
          <TileSkeleton key={index} />
        ))}
      </Grid>
    )
  } else if (genres.length === 0) {
    content = (
      <EmptyState
        title="No genres available"
        message="Genres could not be found right now. Check back soon."
      />
    )
  } else {
    content = (
      <Grid>
        {genres.map((genre) => (
          <Tile
            key={genre.slug}
            to={`/genre/${genre.slug}`}
            $hue={getHue(genre.slug)}
          >
            {genre.name}
          </Tile>
        ))}
      </Grid>
    )
  }

  return (
    <Page>
      <PageHeader
        title="Genres"
        description="Pick a genre to explore movies and series."
      />
      {content}
    </Page>
  )
}

export default Genres