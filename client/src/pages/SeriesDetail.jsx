import { useParams } from 'react-router-dom'
import DetailPage from '../components/DetailPage.jsx'
import SeasonsSection from '../components/SeasonsSection.jsx'

function SeriesDetail() {
  const { id } = useParams()

  return (
    <DetailPage kind="series" id={id}>
      {(series) => <SeasonsSection series={series} />}
    </DetailPage>
  )
}

export default SeriesDetail