import PageContainer from '../components/PageContainer.jsx'
import ListSection from '../components/ListSection.jsx'
import { endpoints } from '../services/api.js'

const COUNT = 6
const params = { limit: COUNT }

const SECTIONS = [
  {
    title: 'Trending Now',
    subtitle: 'What everyone is watching this week',
    path: endpoints.list('trending', params),
  },
  {
    title: 'Popular Movies',
    to: '/movies',
    path: endpoints.list('popular-movies', params),
  },
  {
    title: 'Popular Series',
    to: '/series',
    path: endpoints.list('popular-series', params),
  },
  {
    title: 'Recently Added',
    path: endpoints.list('recent', params),
  },
  {
    title: 'Action',
    to: '/genre/action',
    path: endpoints.genre('action', params),
  },
  {
    title: 'Comedy',
    to: '/genre/comedy',
    path: endpoints.genre('comedy', params),
  },
  {
    title: 'Drama',
    to: '/genre/drama',
    path: endpoints.genre('drama', params),
  },
  {
    title: 'Animation',
    to: '/genre/animation',
    path: endpoints.genre('animation', params),
  },
]

function Home() {
  return (
    <PageContainer>
      {SECTIONS.map((section) => (
        <ListSection key={section.title} count={COUNT} {...section} />
      ))}
    </PageContainer>
  )
}

export default Home