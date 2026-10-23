import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/PagePlaceholder.jsx'

function SeriesDetail() {
    const { id } = useParams()

    return (
        <PagePlaceholder
          title={`Series ${id}`}
          description="Series details, seasons and episodes will appear here."
        />
    )
}

export default SeriesDetail