import { useEffect, useRef, useState } from 'react'
import {
  Link,
  NavLink,
  useLocation,
  useNavigate,
  useSearchParams,
} from 'react-router-dom'
import styled from 'styled-components'
import { BRAND_NAME, NAV_LINKS } from '../data/navigation.js'

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(10, 10, 15, 0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`

const Bar = styled.div`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: ${({ theme }) => theme.layout.navHeight};
  margin: 0 auto;
  padding: 0 ${({ theme }) => theme.layout.gutter};
  display: flex;
  align-items: center;
  gap: 32px;
`

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 1.35rem;
  font-weight: 800;
  letter-spacing: -0.02em;
`

const LogoMark = styled.span`
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 9px;
  background: ${({ theme }) => theme.colors.accent};
  color: #fff;
`

const Links = styled.nav`
  display: flex;
  align-items: center;
  gap: 4px;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

const StyledNavLink = styled(NavLink)`
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  transition: color ${({ theme }) => theme.transition},
    background ${({ theme }) => theme.transition};

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    color: ${({ theme }) => theme.colors.accent};
    background: ${({ theme }) => theme.colors.accentSoft};
  }
`

const MobileLink = styled(StyledNavLink)`
  padding: 14px 12px;
  border-radius: ${({ theme }) => theme.radius.md};
  font-size: 0.9rem;
`

const Actions = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
`

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 280px;
  height: 40px;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: border-color ${({ theme }) => theme.transition};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.text};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    width: auto;
    height: 56px;
    padding: 0 ${({ theme }) => theme.layout.gutter};
    border-width: 0 0 1px 0;
    border-radius: 0;
    background: #0f0f16;
  }
`

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  background: transparent;
  border: 0;
  outline: 0;
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    font-size: 16px;
  }
`

const SubmitButton = styled.button`
  display: grid;
  place-items: center;
  padding: 0;
  background: transparent;
  border: 0;
  color: inherit;
  cursor: pointer;
`

const IconButton = styled.button`
  display: none;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  background: transparent;
  border: 0;
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
  transition: background ${({ theme }) => theme.transition};

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: grid;
  }
`

const MobileMenu = styled.nav`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ $open }) => ($open ? 'flex' : 'none')};
    flex-direction: column;
    gap: 2px;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    padding: 8px ${({ theme }) => theme.layout.gutter} 16px;
    background: #0f0f16;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
`

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const MenuIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
  </svg>
)

const CloseIcon = () => (
  <svg
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <line x1="6" y1="6" x2="18" y2="18" />
    <line x1="18" y1="6" x2="6" y2="18" />
  </svg>
)

const PlayIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 4.5v15a1 1 0 0 0 1.5.86l12-7.5a1 1 0 0 0 0-1.72l-12-7.5A1 1 0 0 0 7 4.5z" />
  </svg>
)

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const [searchParams] = useSearchParams()
  const inputRef = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (location.pathname === '/search') {
      setQuery(searchParams.get('q') || '')
    } else {
      setQuery('')
    }
  }, [location.pathname, searchParams])

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [searchOpen])

  const handleSubmit = (event) => {
    event.preventDefault()
    const trimmed = query.trim()
    if (!trimmed) return
    navigate(`/search?q=${encodeURIComponent(trimmed)}`)
  }

  const toggleSearch = () => {
    setMenuOpen(false)
    setSearchOpen((open) => !open)
  }

  const toggleMenu = () => {
    setSearchOpen(false)
    setMenuOpen((open) => !open)
  }

  return (
    <Header>
      <Bar>
        <Logo to="/">
          <LogoMark>
            <PlayIcon />
          </LogoMark>
          {BRAND_NAME}
        </Logo>

        <Links>
          {NAV_LINKS.map((link) => (
            <StyledNavLink key={link.to} to={link.to} end={link.end}>
              {link.label}
            </StyledNavLink>
          ))}
        </Links>

        <Actions>
          <SearchForm $open={searchOpen} onSubmit={handleSubmit} role="search">
            <SubmitButton type="submit" aria-label="Search">
              <SearchIcon />
            </SubmitButton>
            <SearchInput
              ref={inputRef}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search movies and series"
              aria-label="Search movies and series"
            />
          </SearchForm>

          <IconButton
            type="button"
            onClick={toggleSearch}
            aria-label="Toggle search"
          >
            <SearchIcon />
          </IconButton>

          <IconButton
            type="button"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </IconButton>
        </Actions>
      </Bar>

      <MobileMenu $open={menuOpen}>
        {NAV_LINKS.map((link) => (
          <MobileLink key={link.to} to={link.to} end={link.end}>
            {link.label}
          </MobileLink>
        ))}
      </MobileMenu>
    </Header>
  )
}

export default Navbar