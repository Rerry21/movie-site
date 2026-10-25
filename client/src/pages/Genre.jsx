import { useParams, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import PageContainer from '../components/PageContainer.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Tabs from '../components/Tabs.jsx'
import TitleGrid from '../components/TitleGrid.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import useApi from '../hooks/useApi.js'
import { endpoints } from '../services/api.js'

const TYPE_TABS = [
  { value: 'all', label: 'All' },
  { value: 'movie', label: 'Movies' },
  { value: 'series', label: 'Series' },
]

const Page = styled(PageContainer)`
  gap: 28px;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

const formatSlug = (slug = '') =>
  slug
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')

function Genre() {
  const { genre } = useParams()
  const [searchParams, setSearchParams] = useSearchParams()

  const requested = searchParams.get('type')
  const type = requested === 'movie' || requested === 'series' ? requested : 'all'

  const path = endpoints.genre(genre, type === 'all' ? {} : { type })
  const { data, loading, error, reload } = useApi(path)

  const items = data?.items || []
  const name = data?.name || formatSlug(genre)
  const notFound = error?.status === 404

  const handleChange = (value) => {
    if (value === 'all') {
      setSearchParams({}, { replace: true })
      return
    }
    setSearchParams({ type: value }, { replace: true })
  }

  let content

  if (notFound) {
    content = (
      <EmptyState
        title="Genre not found"
        message="We could not find that genre. Pick one from the genres page."
        actionLabel="Browse genres"
        actionTo="/genres"
      />
    )
  } else if (error) {
    content = <ErrorState message={error.message} onRetry={reload} />
  } else if (!loading && items.length === 0) {
    content = (
      <EmptyState
        title="No titles in this genre"
        message={
          type === 'all'
            ? 'No titles are available in this genre right now.'
            : 'Nothing matched this filter. Try All.'
        }
      />
    )
  } else {
    content = <TitleGrid items={items} loading={loading} skeletonCount={12} />
  }

  return (
    <Page>
      <Top>
        <PageHeader
          title={notFound ? 'Genre' : name}
          description={notFound ? undefined : 'Movies and series in this genre.'}
        />
        {!notFound && (
          <Tabs
            label="Filter by type"
            items={TYPE_TABS}
            value={type}
            onChange={handleChange}
          />
        )}
      </Top>
      {content}
    </Page>
  )
}

export default Genre