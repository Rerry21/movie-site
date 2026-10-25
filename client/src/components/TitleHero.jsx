import { useState } from 'react'
import styled from 'styled-components'
import { formatRuntime, getHue } from '../utils/format.js'

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Backdrop = styled.div`
  position: absolute;
  inset: -60px;
  background-image: ${({ $src }) => ($src ? `url("${$src}")` : 'none')};
  background-size: cover;
  background-position: center;
  filter: blur(45px) saturate(1.3);
  opacity: 0.4;
`

const Shade = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(10, 10, 15, 0.35),
    ${({ theme }) => theme.colors.bg}
  );
`

const Inner = styled.div`
  position: relative;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 48px ${({ theme }) => theme.layout.gutter} 56px;
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr);
  gap: 40px;
  align-items: start;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    padding-top: 28px;
    padding-bottom: 40px;
  }
`

const PosterFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 280px;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.lg};
  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.55);

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    max-width: 200px;
    justify-self: center;
  }
`

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PosterFallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.85);
  background: linear-gradient(
    160deg,
    hsl(${({ $hue }) => $hue}, 45%, 24%),
    hsl(${({ $hue }) => ($hue + 40) % 360}, 50%, 10%)
  );
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-width: 0;
`

const Kind = styled.span`
  color: ${({ theme }) => theme.colors.accent};
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`

const Title = styled.h1`
  font-size: clamp(2rem, 5vw, 3.4rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.08;
`

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 16px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.92rem;
`

const Rating = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #ffc857;
  font-weight: 700;
`

const Rated = styled.span`
  padding: 1px 8px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  font-size: 0.78rem;
  font-weight: 600;
`

const Genres = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`

const Chip = styled.span`
  padding: 5px 14px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(255, 255, 255, 0.07);
  font-size: 0.8rem;
  font-weight: 600;
`

const Overview = styled.p`
  max-width: 720px;
  color: #d3d3dd;
  line-height: 1.7;
`

const Credits = styled.dl`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: 6px 16px;
  max-width: 720px;
  margin: 0;
  font-size: 0.9rem;

  dt {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  dd {
    margin: 0;
  }
`

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 6px;
`

const StarIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
  </svg>
)

function TitleHero({ item, actions }) {
  const [imageFailed, setImageFailed] = useState(false)

  const hasPoster = Boolean(item.poster) && !imageFailed
  const hasRating = typeof item.rating === 'number' && item.rating > 0
  const isSeries = item.type === 'series'

  const length = isSeries
    ? item.seasons
      ? `${item.seasons} ${item.seasons === 1 ? 'season' : 'seasons'}`
      : null
    : formatRuntime(item.runtime)

  const episodeLength =
    isSeries && item.runtime ? `${item.runtime}m per episode` : null

  const credits = [
    ['Director', item.director],
    ['Cast', item.actors?.length ? item.actors.join(', ') : null],
  ].filter(([, value]) => value)

  return (
    <Hero>
      <Backdrop $src={item.poster} />
      <Shade />
      <Inner>
        <PosterFrame>
          {hasPoster ? (
            <PosterImage
              src={item.poster}
              alt={item.title}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <PosterFallback $hue={getHue(item.id)}>{item.title}</PosterFallback>
          )}
        </PosterFrame>

        <Info>
          <Kind>{isSeries ? 'TV Series' : 'Movie'}</Kind>
          <Title>{item.title}</Title>

          <MetaRow>
            {hasRating && (
              <Rating>
                <StarIcon />
                {item.rating.toFixed(1)}
              </Rating>
            )}
            {item.year && <span>{item.year}</span>}
            {item.rated && <Rated>{item.rated}</Rated>}
            {length && <span>{length}</span>}
            {episodeLength && <span>{episodeLength}</span>}
          </MetaRow>

          {item.genres?.length > 0 && (
            <Genres>
              {item.genres.map((genre) => (
                <Chip key={genre}>{genre}</Chip>
              ))}
            </Genres>
          )}

          <Overview>{item.overview || 'No description available.'}</Overview>

          {credits.length > 0 && (
            <Credits>
              {credits.map(([label, value]) => (
                <div key={label} style={{ display: 'contents' }}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
            </Credits>
          )}

          {actions && <Actions>{actions}</Actions>}
        </Info>
      </Inner>
    </Hero>
  )
}

export default TitleHero