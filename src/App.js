import React, { useEffect, useState } from 'react';
import './App.css';
import MovieBox from './components/MovieBox';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, Form, FormControl, Button } from 'react-bootstrap';

const API_URL = "https://api.themoviedb.org/3/movie/popular?api_key=e4016d7a28f89745bc184dfb96de3b98";
const API_SEARCH = "https://api.themoviedb.org/3/search/movie?api_key=e4016d7a28f89745bc184dfb96de3b98&query=";
const API_GENRES = "https://api.themoviedb.org/3/genre/movie/list?api_key=e4016d7a28f89745bc184dfb96de3b98";

function App() {

  const [movies, setMovies] = useState([]);
  const [genres, setGenre] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      setMovies(data.results)
    })
    .catch(error => console.log(error));

    fetch(API_GENRES)
    .then(response => response.json())
    .then(data => {
      setGenre(data.genres);
    })
    .catch(error => console.log(error));
  }, []);

  const searchMovie = async (e) => {
    e.preventDefault();
    try {
      await fetch(API_SEARCH + query)
      .then(response => response.json())
      .then(data => {
        setMovies(data.results)
      })
    } catch (e) {
      console.log(e);
    }
  }

  const changeHandler = (e) => {
    setQuery(e.target.value);
  }
  return (
    <div>
      <Navbar bg="dark" expand="lg" variant="dark">
        <Container fluid>
          <Navbar.Brand href="/home">Movie App</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll"></Navbar.Toggle>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-3" style={{ maxHeight: '100px' }} navbarScroll></Nav>
              <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
                <FormControl
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  name = "query"
                  value={query}
                  onChange={changeHandler}></FormControl>
                <Button variant="secondary" type="submit">Search</Button>
              </Form>
            </Navbar.Collapse>
          
        </Container>
      </Navbar>
      <div>
        {movies.length > 0 ? (
          <div className="container">
            <div className="grid">
              {movies.map((movieReq) => 
                <MovieBox key={movieReq.id} {...movieReq} genres={genres}/>
              )}
            </div>
          </div>
        ) : (
          <h2> Sorry, no movies found :( </h2>
        )}
        
      </div>
    </div>
  );
}

export default App;