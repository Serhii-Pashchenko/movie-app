import React, { useEffect, useState, useContext } from 'react';
import './App.css';
import MovieBox from './components/MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  Navbar,
  Container,
  Nav,
  Form,
  FormControl,
  Button,
} from 'react-bootstrap';

const API_URL =
  'https://api.themoviedb.org/3/movie/popular?api_key=e4016d7a28f89745bc184dfb96de3b98';
const API_SEARCH =
  'https://api.themoviedb.org/3/search/movie?api_key=e4016d7a28f89745bc184dfb96de3b98&query=';
const API_GENRES =
  'https://api.themoviedb.org/3/genre/movie/list?api_key=e4016d7a28f89745bc184dfb96de3b98';

function App() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenre] = useState([]);
  const [query, setQuery] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setMovies(data.results);
      } catch (error) {
        setError(error);
      }
    };

    const fetchGenres = async () => {
      try {
        const response = await fetch(API_GENRES);
        if (!response.ok) {
          throw new Error(`Error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setGenre(data.genres);
      } catch (error) {
        setError(error);
      }
    };

    fetchAPI();
    fetchGenres();
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(API_SEARCH + query);
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      console.log(data.results);
      if (data.results.length > 0) {
        setMovies(data.results);
      } else {
        throw new Error('Sorry, no movies found :(');
      }
      setMovies(data.results);
    } catch (error) {
      setError(error);
    }
  };

  const changeHandler = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">Movie App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-3"
              style={{ maxHeight: '100px' }}
              navbarScroll
            ></Nav>
            <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                name="query"
                value={query}
                onChange={changeHandler}
              ></FormControl>
              <Button variant="secondary" type="submit">
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div>
        {error ? (
          <h2>{error.message}</h2>
        ) : (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => (
                <MovieBox key={movieReq.id} {...movieReq} genres={genres} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
