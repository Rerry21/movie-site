import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import theme from './styles/theme.js'
import GlobalStyle from './styles/GlobalStyle.js'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Movies from './pages/Movies.jsx'
import Series from './pages/Series.jsx'
import Genres from './pages/Genres.jsx'
import Genre from './pages/Genre.jsx'
import Search from  './pages/Search.jsx'
import Watchlist from './pages/Watchlist.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import SeriesDetail from './pages/SeriesDetail.jsx'
import Watch from './pages/Watch.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/movies" element={<Movies />} />
            <Route path="/series" element={<Series />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genre/:genre" element={<Genre />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/series/:id" element={<SeriesDetail />} />
            <Route path="/watch/:type/:id" element={<Watch />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App