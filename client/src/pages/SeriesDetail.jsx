import { useParams } from 'react-router-dom'
import DetailPage from '../components/DetailPage.jsx'

function SeriesDetail() {
    const { id } = useParams()

    return <DetailPage kind="series" id={id} />
}

export default SeriesDetail