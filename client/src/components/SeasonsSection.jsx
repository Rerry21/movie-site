import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import Section from './Section.jsx'
import Tabs from './Tabs.jsx'
import EpisodeList from './EpisodeList.jsx'
import EmptyState from './EmptyState.jsx'

const MAX_TABS = 10

const Select = styled.select`
  align-self: flex-start;
  min-width: 180px;
  padding: 10px 18px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;

  &:focus {
    outline: 0;
    border-color: ${({ theme }) => theme.colors.accent};
  }
`

const Controls = styled.div`
  display: flex;
  flex-direction: column;
`

function SeasonsSection({ series }) {
  const [searchParams, setSearchParams] = useSearchParams()

  const total =
    Number.isInteger(series.seasons) && series.seasons > 0 ? series.seasons : 0

  if (total === 0) {
    return (
      <Section title="Episodes">
        <EmptyState
          title="No episodes available"
          message="Season information is not available for this series."
        />
      </Section>
    )
  }

  const requested = Number(searchParams.get('season'))
  const season =
    Number.isInteger(requested) && requested >= 1 && requested <= total
      ? requested
      : 1

  const handleChange = (value) => {
    const next = new URLSearchParams(searchParams)
    if (Number(value) === 1) {
      next.delete('season')
    } else {
      next.set('season', value)
    }
    setSearchParams(next, { replace: true })
  }

  const options = Array.from({ length: total }, (_, index) => ({
    value: String(index + 1),
    label: `Season ${index + 1}`,
  }))

  return (
    <Section
      title="Episodes"
      subtitle={`${total} ${total === 1 ? 'season' : 'seasons'}`}
    >
      <Controls>
        {total <= MAX_TABS ? (
          <Tabs
            label="Seasons"
            items={options}
            value={String(season)}
            onChange={handleChange}
          />
        ) : (
          <Select
            aria-label="Select season"
            value={String(season)}
            onChange={(event) => handleChange(event.target.value)}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        )}
      </Controls>
      <EpisodeList seriesId={series.id} season={season} />
    </Section>
  )
}

export default SeasonsSection