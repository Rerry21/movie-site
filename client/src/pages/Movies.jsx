import BrowsePage from '../components/BrowsePage.jsx'

const TABS = [
  { value: 'popular', label: 'Popular', list: 'popular-movies' },
  { value: 'top-rated', label: 'Top Rated', list: 'top-rated-movies' },
  { value: 'trending', label: 'Trending', list: 'trending', typed: true },
  { value: 'recent', label: 'Recently Added', list: 'recent', typed: true },
]

function Movies() {
  return (
    <BrowsePage
      type="movie"
      title="Movies"
      description="Browse popular, top rated and trending movies."
      tabs={TABS}
    />
  )
}

export default Movies