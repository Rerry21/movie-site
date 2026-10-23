import styled from 'styled-components'
import TitleCard from './TitleCard.jsx'
import TitleCardSkeleton from './TitleCardSkeleton.jsx'

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(170px, 1fr));
  gap: 28px 18px;

  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px 12px;
  }
`

function TitleGrid({ items = [], loading = false, skeletonCount = 12 }) {
    if(loading) {
        return (
            <Grid>
                {Array.from({length: skeletonCount }, (_, index) => (
                    <TitleCardSkeleton key={index} />
                ))}
            </Grid>
        )
    }

    return (
    <Grid>
      {items.map((item) => (
        <TitleCard key={`${item.type}-${item.id}`} item={item} />
      ))}
    </Grid>
  )
}

export default TitleGrid