import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useApi from '../hooks/useApi.js'
import { endpoints } from '../services/api.js'
import { formatDate } from '../utils/format.js'
import WatchlistButton from '../components/WatchlistButton.jsx'

const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - ${({ theme }) => theme.layout.navHeight});
  background: ${({ theme }) => theme.colors.bg};
`

const TopBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 14px ${({ theme }) => theme.layout.gutter};
  background: ${({ theme }) => theme.colors.bg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
  font-weight: 600;
  transition: color ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

const TopTitle = styled.h1`
  font-size: 1rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Content = styled.div`
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  padding: 24px ${({ theme }) => theme.layout.gutter} 48px;
  display: flex;
  flex-direction: column;
  gap: 28px;
`

const PlayerWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  background: #000;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.45);
`

const Frame = styled.iframe`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
`

const Details = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;
`

const HeaderRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`

const EpisodeTitle = styled.h2`
  font-size: clamp(1.35rem, 3vw, 1.75rem);
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.25;
`

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 18px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.9rem;
`

const MetaItem = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
`

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #ffc857;
  font-weight: 700;
`

const Overview = styled.p`
  max-width: 720px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.95rem;
  line-height: 1.6;
`

const NavRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
`

const NavButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition};

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.surfaceHover};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  &:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
`

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
)

const StarIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
  </svg>
)

const ChevronLeft = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 18l-6-6 6-6" />
  </svg>
)

const ChevronRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
)

function buildEmbedUrl(type, id, season, episode) {
  if (type === 'movie') {
    return `https://vidsrc.mov/embed/movie/${id}`
  }
  const s = season || '1'
  const e = episode || '1'
  return `https://vidsrc.mov/embed/tv/${id}/${s}/${e}`
}

function Watch() {
  const { type, id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const season = searchParams.get('season') || '1'
  const episode = searchParams.get('episode') || '1'

  const isSeries = type === 'series'
  const backTo = isSeries ? `/series/${id}` : `/movie/${id}`

  const detailPath = isSeries ? endpoints.series(id) : endpoints.movie(id)
  const { data: detail } = useApi(detailPath)

  const seasonPath = isSeries ? endpoints.season(id, season) : null
  const { data: seasonData } = useApi(seasonPath)

  const episodes = (seasonData?.episodes || []).filter(
    (ep) => typeof ep.episode === 'number'
  )

  const currentIndex = episodes.findIndex(
    (ep) => String(ep.episode) === String(episode)
  )

  const currentEpisode = currentIndex >= 0 ? episodes[currentIndex] : null
  const prevEpisode = currentIndex > 0 ? episodes[currentIndex - 1] : null
  const nextEpisode =
    currentIndex >= 0 && currentIndex < episodes.length - 1
      ? episodes[currentIndex + 1]
      : null

  const name = detail?.title || id
  const topLabel = isSeries
    ? `${name} · S${season}E${episode}`
    : name

  const episodeTitle = isSeries
    ? currentEpisode?.title || `Episode ${episode}`
    : detail?.title

  const overview = isSeries
    ? currentEpisode?.overview || detail?.overview
    : detail?.overview

  const released = isSeries
    ? currentEpisode?.released
    : detail?.released

  const rating = isSeries
    ? currentEpisode?.rating
    : detail?.rating

  const embedUrl = buildEmbedUrl(type, id, season, episode)

  const watchlistItem = detail
    ? {
        id: detail.id,
        type: detail.type,
        title: detail.title,
        poster: detail.poster,
        year: detail.year,
        rating: detail.rating,
        genres: detail.genres,
      }
    : null

  function goToEpisode(ep) {
    navigate(`/watch/series/${id}?season=${season}&episode=${ep.episode}`)
  }

  return (
    <Page>
      <TopBar>
        <BackLink to={backTo}>
          <BackIcon />
          Back
        </BackLink>
        <TopTitle>{topLabel}</TopTitle>
      </TopBar>

      <Content>
        <PlayerWrap>
          <Frame
            src={embedUrl}
            title={episodeTitle || name}
            allowFullScreen
            allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
            referrerPolicy="origin"
          />
        </PlayerWrap>

        <Details>
          <HeaderRow>
            <EpisodeTitle>{episodeTitle}</EpisodeTitle>
            {watchlistItem && <WatchlistButton item={watchlistItem} />}
          </HeaderRow>

          <Meta>
            {isSeries && (
              <MetaItem>
                Season {season} · Episode {episode}
              </MetaItem>
            )}
            {released && <MetaItem>{formatDate(released)}</MetaItem>}
            {typeof rating === 'number' && rating > 0 && (
              <Rating>
                <StarIcon />
                {rating.toFixed(1)}
              </Rating>
            )}
          </Meta>

          {overview && <Overview>{overview}</Overview>}

          {isSeries && (
            <NavRow>
              <NavButton
                disabled={!prevEpisode}
                onClick={() => prevEpisode && goToEpisode(prevEpisode)}
              >
                <ChevronLeft />
                Previous
              </NavButton>
              <NavButton
                disabled={!nextEpisode}
                onClick={() => nextEpisode && goToEpisode(nextEpisode)}
              >
                Next
                <ChevronRight />
              </NavButton>
            </NavRow>
          )}
        </Details>
      </Content>
    </Page>
  )
}

export default Watch