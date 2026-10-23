import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PagePlaceholder from '../components/PagePlaceholder'

const Back = styled(Link)`
  display: inline-block;
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.gutter};
  max-width: ${({ theme }) => theme.layout.maxWidth};
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 600;
`
function NotFound() {
    return (
        <>
          <PagePlaceholder
            tag="404"
            title="Page not found"
            description="The page your looking for does not exist"
          />
          <Back to="/">Back to home</Back>
        </>
    )
}

export default NotFound