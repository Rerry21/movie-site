import styled from 'styled-components'

const PageContainer = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: 32px ${({ theme }) => theme.layout.gutter} 64px;
  display: flex;
  flex-direction: column;
  gap: 48px;
`

export default PageContainer