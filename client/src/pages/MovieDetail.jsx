import { useParams } from 'react-router-dom'
import DetailPage from '../components/DetailPage.jsx'

function MovieDetail() {
  const { id } = useParams()

  return <DetailPage kind="movie" id={id} />
}

export default MovieDetail
