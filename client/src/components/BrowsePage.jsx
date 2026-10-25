import { useSearchParams } from 'react-router-dom'
import styled from 'styled-components'
import PageContainer from './PageContainer.jsx'
import PageHeader from './PageHeader.jsx'
import Tabs from './Tabs.jsx'
import TitleGrid from './TitleGrid.jsx'
import EmptyState from './EmptyState.jsx'
import ErrorState from './ErrorState.jsx'
import useApi from '../hooks/useApi.js'
import { endpoints } from '../services/api.js'

const Page = styled(PageContainer)`
  gap: 28px;
`

const Top = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

function BrowsePage({ type, title, description, tabs }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const requested = searchParams.get('sort')
  const active = tabs.find((tab) => tab.value === requested) || tabs[0]

  const path = endpoints.list(active.list, active.typed ? { type } : {})
  const { data, loading, error, reload } = useApi(path)
  const items = data?.items || []

  const handleChange = (value) => {
    setSearchParams({ sort: value }, { replace: true })
  }

  let content

  if (error) {
    content = <ErrorState message={error.message} onRetry={reload} />
  } else if (!loading && items.length === 0) {
    content = (
      <EmptyState
        title="Nothing here yet"
        message="No titles are available in this category right now. Try another tab."
      />
    )
  } else {
    content = <TitleGrid items={items} loading={loading} skeletonCount={12} />
  }

  return (
    <Page>
      <Top>
        <PageHeader title={title} description={description} />
        <Tabs
          label={`${title} categories`}
          items={tabs}
          value={active.value}
          onChange={handleChange}
        />
      </Top>
      {content}
    </Page>
  )
}

export default BrowsePage