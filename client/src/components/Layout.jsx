import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar.jsx'

const Main = styled.main`
  min-height: calc(100vh - ${({ theme }) => theme.layout.navHeight});
`

function Layout() {
    const { pathname } = useLocation()

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [pathname])

    return (
    <>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
    </>
);
}

export default Layout