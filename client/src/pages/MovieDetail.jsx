import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/PagePlaceholder.jsx'

function MovieDetail() {
  const { id } = useParams()

  return (
    <PagePlaceholder
      title={`Movie ${id}`}
      description="Movie details will appear here."
    />
  )
}

export default MovieDetail