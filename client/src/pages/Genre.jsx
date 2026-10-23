import { useParams } from 'react-router-dom'
import PagePlaceholder from '../components/PagePlaceholder.jsx'

function Genre() {
  const { genre } = useParams()

  return (
    <PagePlaceholder
      title={`Genre: ${genre}`}
      description="Titles in this genre will appear here."
    />
  )
}

export default Genre