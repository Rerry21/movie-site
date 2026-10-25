import Section from './Section.jsx'
import TitleGrid from './TitleGrid.jsx'
import EmptyState from './EmptyState.jsx'
import ErrorState from './ErrorState.jsx'
import useApi from '../hooks/useApi.js'

function ListSection({ title, subtitle, to, path, count = 6 }) {
    const { data, loading, error, reload } = useApi(path)
    const items = data?.items || []

    let content 

    if (error) {
        content = <ErrorState message={error.message} onRetry={reload} />
    } else if (!loading && items.length === 0) {
        content = (
            <EmptyState
              title="Nothing here yet"
              message="No titles are available in this section right now. Check back soon."
            />
        )
    } else {
        content = <TitleGrid items={items} loading={loading} skeletonCount={count} />
    }

    return (
        <Section title={title} subtitle={subtitle} to={to}>
            {content}
        </Section>
    )
}

export default ListSection