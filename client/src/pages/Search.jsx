import { useSearchParams } from 'react-router-dom'
import PagePlaceholder from "../components/PagePlaceholder"

function Search() {
    const [searchParams] = useSearchParams()
    const query = searchParams.get('q') || ''

    return (
        <PagePlaceholder
          title={query ? `Results for "${query}"` : 'Search'}
          description="Search results will appear here."
        />
    )
}

export default Search