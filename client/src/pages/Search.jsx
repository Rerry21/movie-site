import { data, useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import PageContainer from '../components/PageContainer.jsx'
import PageHeader from '../components/PageHeader.jsx'
import Tabs from '../components/Tabs.jsx'
import TitleGrid from '../components/TitleGrid.jsx'
import Pagination from '../components/Pagination.jsx'
import EmptyState from '../components/EmptyState.jsx'
import ErrorState from '../components/ErrorState.jsx'
import useApi from '../hooks/useApi.js'
import { endpoints } from '../services/api.js'

const TYPE_TABS = [
    { value: 'all', label: 'All' },
    { value: 'movies', label: "Movies"},
    { value: 'series', label: 'Series'},
]

const Page = styled(PageContainer)`
  gap: 28px;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px
`

const SearchIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

function Search() {
    const [searchParams, setSearchParams] = useSearchParams()
    
    const query = (searchParams.get('q') || '').trim()
    const requestedType = searchParams.get('type')
    const type =
      requestedType === 'movie' || requestedType === 'series' ? requestedType : 'all'
    const rawPage = Number(searchParams.get('page'))
    const page = 
      Number.isInteger(rawPage) && rawPage >= 1 && rawPage <= 100 ? rawPage : 1

    const ready = query.length >= 2

    const path = ready
      ? endpoints.search({
        q: query,
        type: type === 'all' ? undefined : type,
        page: page > 1 ? page : undefined,
      })
     : null

    const { data, loading, error, reload } =useApi(path)
    const results = data?.results || []
    
    const update = (changes) => {
        const next = new URLSearchParams(searchParams)
        Object.entries(changes).forEach(([key, value]) => {
            if (value === undefined || value === null || value === '') {
                next.delete(key)
            } else {
                next.set(key, value)
            }
        })

        setSearchParams(next)
    }

    const handlePage = (value) => {
        update({ page: value > 1 ? value: null })
        window.scrollTo({ top:0, behavior: 'smooth'})
    }

    let content

    if (!ready) {
        content = (
            <EmptyState
              icon={<SearchIcon />}
              title={query ? 'Keep typing' : 'Search for a movie or series'}
              message={
                query
                ? 'Enter at least 2 characters to search.'
                : 'Use the search bar above to find titles by name.'
              }
            />
        )
    } else if (error) {
        content = <ErrorState message={error.message} onRetry={reload} />
    } else if (!loading && results.length === 0) {
        content = (
            <EmptyState
              icon={<SearchIcon />}
              title="No results found"
              message={`We could not find anything for "${query}". Check the spelling or try a shorter title.`}
              actionLabel="Browse movies"
              actionTo="/movies"
            />
        )
    } else {
        content = (
            <>
              <TitleGrid items={results} loading={loading} skeletonCount={10} />
              {!loading && (
                <Pagination
                  page={data?.page || page}
                  totalPages={data?.totalPages || 1}
                  onChange={handlePage}
                />
              )}
            </>
        )
    }

const description =
  ready && data
    ? `${data.totalResults} ${data.totalResults === 1 ? 'result' : 'results'}`
    : undefined

return (
    <Page>
        <Top>
            <PageHeader
              title={query ? `Results for "${query}"` : 'search'}
              description={description}
            />
            {ready && (
                <Tabs
                  label="Filter by type"
                  items={TYPE_TABS}
                  value={type}
                  onChange={handlePage}
                />
            )}
        </Top>
        {content}
    </Page>
)

}

export default Search