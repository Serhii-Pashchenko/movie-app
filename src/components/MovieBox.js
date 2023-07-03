import React, { useEffect, useState } from 'react';
import { Modal, show, Button } from 'react-bootstrap';
import NoPhotoMan from '../assets/man.jpg';
import NoPhotoWoman from '../assets/woman.jpg';
const API_IMG = 'https://image.tmdb.org/t/p/w500/';

const MovieBox = ({
  id,
  title,
  poster_path,
  genre_ids,
  vote_average,
  release_date,
  overview,
  genres,
}) => {
  const [show, setShow] = useState(false);
  const [actors, setActors] = useState([]);
  const [error, setError] = useState(null);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}/casts?api_key=e4016d7a28f89745bc184dfb96de3b98`
        );
        const data = await response.json();
        setActors(data.cast);
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="card text-center bg-secondary mb-3 mt-3">
      <div className="card-body">
        <img className="card-img-top" src={API_IMG + poster_path} alt={title} />
        <div style={{ paddingBottom: '0' }} className="card-body">
          <button type="button" className="btn btn-dark" onClick={handleShow}>
            {' '}
            View Details{' '}
          </button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img
                className="card-img-top"
                src={API_IMG + poster_path}
                alt={title}
              />
              <h3>{title}</h3>
              <h4>IMDb: {vote_average}</h4>
              <h5>
                Genres:{' '}
                {genre_ids
                  .map((genreId) => {
                    const genre = genres.find((g) => g.id === genreId);
                    return genre ? genre.name : '';
                  })
                  .join(', ')}
              </h5>
              <h5>Release Date: {release_date}</h5>
              <br></br>
              <h5>Overview</h5>
              <p>{overview}</p>
              <h5>Actors</h5>
              <br />
              <div className="actors">
                {error ? (
                  <p>Server error: {error.message}</p>
                ) : actors ? (
                  actors.map((actor) => (
                    <div className="actors item" key={actor.id}>
                      {actor.profile_path ? (
                        <img
                          src={API_IMG + actor.profile_path}
                          alt={actor.name}
                        />
                      ) : actor.gender === 1 ? (
                        <img src={NoPhotoWoman} alt={actor.name} />
                      ) : (
                        <img src={NoPhotoMan} alt={actor.name} />
                      )}
                      <div>
                        <span style={{ fontWeight: 'bold' }}>{actor.name}</span>
                        <br />
                        <span style={{ fontStyle: 'italic', color: 'grey' }}>
                          {actor.character}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default MovieBox;
