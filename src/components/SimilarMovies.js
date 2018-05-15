import React from 'react';
import PropTypes from 'prop-types';
import {Container, Card, Header} from 'semantic-ui-react';

import similarMoviesJson from '../mock/similar.json';
import MovieCard from './MovieCard';

function SimilarMovies(props) {
  const similarMovies = similarMoviesJson;
  const first8similarMovies = similarMovies.results.slice(0, 8);

  return (
    <Container text>
      <Header as="h3" dividing>
        Similar Movies
      </Header>
      <Card.Group doubling itemsPerRow={4}>
        {first8similarMovies.map(m => (
          <MovieCard movie={m} compact key={m.id} />
        ))}
      </Card.Group>
    </Container>
  );
}

SimilarMovies.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default SimilarMovies;
