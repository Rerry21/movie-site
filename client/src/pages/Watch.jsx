import { useParams, useSearchParams } from 'react-router-dom'
import pagePlaceholder from '../components/PagePlaceholder'

function Watch() {
    const { type, id } = useParams()
    const [searchParams] = useSearchParams()
    const season = searchParams.get('season')
    const episode = searchParams.get('episode')

    const suffix = season && episode ? ` S${season}E${episode}` : ''

    return (
        <pagePlaceholder
          title={`Watch ${type} ${id}${suffix}`}
          description="The streaming player will appear here."
        />
    )
}

export default Watch