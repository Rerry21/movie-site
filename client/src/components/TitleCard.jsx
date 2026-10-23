import { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const getHue = (id) => {
  const value = String(id)
  let hash = 0
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) % 360
  }
  return hash
}

const Poster = styled.div`
  position: relative;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.md};
  transition: transform ${({ theme }) => theme.transition},
    border-color ${({ theme }) => theme.transition},
    box-shadow ${({ theme }) => theme.transition};
`

const PosterImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Fallback = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 16px;
  text-align: center;
  color: rgba(255, 255, 255, 0.85);
  background: linear-gradient(
    160deg,
    hsl(${({ $hue }) => $hue}, 45%, 24%),
    hsl(${({ $hue }) => ($hue + 40) % 360}, 50%, 10%)
  );
`

const FallbackTitle = styled.span`
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`

const Badge = styled.span`
  position: absolute;
  top: 10px;
  padding: 3px 9px;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: rgba(10, 10, 15, 0.75);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
`

const TypeBadge = styled(Badge)`
  left: 10px;
  color: ${({ theme }) => theme.colors.accent};
`

const RatingBadge = styled(Badge)`
  right: 10px;
  display: flex;
  align-items: center;
  gap: 4px;
  color: #ffc857;
`

const PlayOverlay = styled.span`
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  background: linear-gradient(to top, rgba(10, 10, 15, 0.7), transparent 60%);
  opacity: 0;
  transition: opacity ${({ theme }) => theme.transition};
`

const PlayCircle = styled.span`
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
  transform: scale(0.85);
  transition: transform ${({ theme }) => theme.transition};
`

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;

  &:hover ${Poster} {
    transform: translateY(-4px);
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 12px 28px rgba(0, 0, 0, 0.5);
  }

  &:hover ${PlayOverlay} {
    opacity: 1;
  }

  &:hover ${PlayCircle} {
    transform: scale(1);
  }
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
`

const Name = styled.h3`
  font-size: 0.92rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const Meta = styled.p`
  font-size: 0.78rem;
  color: ${({ theme }) => theme.colors.textMuted};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const FilmIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <line x1="7" y1="4" x2="7" y2="20" />
    <line x1="17" y1="4" x2="17" y2="20" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
)

const StarIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z" />
  </svg>
)

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
  </svg>
)

function TitleCard({ item }) {
  const [imageFailed, setImageFailed] = useState(false)

  const hasPoster = Boolean(item.poster) && !imageFailed
  const hasRating = typeof item.rating === 'number' && item.rating > 0
  const meta = [item.year, item.genres?.[0]].filter(Boolean).join(' • ')

  return (
    <Card to={`/${item.type}/${item.id}`} title={item.title}>
      <Poster>
        {hasPoster ? (
          <PosterImage
            src={item.poster}
            alt={item.title}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <Fallback $hue={getHue(item.id)}>
            <FilmIcon />
            <FallbackTitle>{item.title}</FallbackTitle>
          </Fallback>
        )}

        <TypeBadge>{item.type === 'series' ? 'Series' : 'Movie'}</TypeBadge>

        {hasRating && (
          <RatingBadge>
            <StarIcon />
            {item.rating.toFixed(1)}
          </RatingBadge>
        )}

        <PlayOverlay>
          <PlayCircle>
            <PlayIcon />
          </PlayCircle>
        </PlayOverlay>
      </Poster>

      <Info>
        <Name>{item.title}</Name>
        {meta && <Meta>{meta}</Meta>}
      </Info>
    </Card>
  )
}

export default TitleCard