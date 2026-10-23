import { useSearchParams } from 'react-router-dom'
import PageContainer from '../components/PageContainer.jsx'
import Section from '../components/Sections.jsx'
import TitleGrid from '../components/TitleGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'
import { SAMPLE_TITLES } from '../data/sampleTitles.js'

function Home() {
  const [searchParams] = useSearchParams()
  const demo = searchParams.get('demo')

  const loading = demo === 'loading'
  const empty = demo === 'empty'

  const all = empty ? [] : SAMPLE_TITLES
  const movies = all.filter((item) => item.type === 'movie')
  const series = all.filter((item) => item.type === 'series')
  const trending = all.slice(0, 6)

  const renderContent = (items, count) => {
    if (!loading && items.length === 0) {
      return (
        <EmptyState
          title="Nothing here yet"
          message="No titles are available in this section right now. Check back soon."
        />
      )
    }
    return <TitleGrid items={items.slice(0, count)} loading={loading} skeletonCount={count} />
  }

  return (
    <PageContainer>
      <Section title="Trending Now" subtitle="What everyone is watching this week">
        {renderContent(trending, 6)}
      </Section>

      <Section title="Popular Movies" to="/movies">
        {renderContent(movies, 6)}
      </Section>

      <Section title="Popular Series" to="/series">
        {renderContent(series, 6)}
      </Section>
    </PageContainer>
  )
}

export default Home