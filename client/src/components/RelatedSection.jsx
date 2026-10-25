import Section from './Section.jsx'
import TitleGrid from './TitleGrid.jsx'
import useApi from '../hooks/useApi.js'
import { endpoints } from '../services/api.js'

const COUNT = 6

function RelatedSection({ id, kind }) {
  const { data, loading, error } = useApi(
    endpoints.related(id, { type: kind, limit: COUNT })
  )
  const items = data?.items || []

  if (error || (!loading && items.length === 0)) return null

  return (
    <Section title={kind === 'series' ? 'More Series Like This' : 'More Like This'}>
      <TitleGrid items={items} loading={loading} skeletonCount={COUNT} />
    </Section>
  )
}

export default RelatedSection