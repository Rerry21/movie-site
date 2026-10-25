import BrowsePage from '../components/BrowsePage.jsx'

const TABS = [
  { value: 'popular', label: 'Popular', list: 'popular-series' },
  { value: 'top-rated', label: 'Top Rated', list: 'top-rated-series' },
  { value: 'trending', label: 'Trending', list: 'trending', typed: true },
  { value: 'recent', label: 'Recently Added', list: 'recent', typed: true },
]

function Series() {
  return (
    <BrowsePage
      type="series"
      title="Series"
      description="Browse popular, top rated and trending TV series."
      tabs={TABS}
    />
  )
}

export default Series