import React from 'react';
import PropTypes from 'prop-types';
import {Container, Card, Header} from 'semantic-ui-react';
import {createResource} from 'simple-cache-provider';

import withCache from '../lib/withCache';
import {fetchSimilarMovies} from '../api';
import MovieCard from './MovieCard';

const similarMoviesResource = createResource(fetchSimilarMovies);

function SimilarMovies(props) {
  const similarMovies = similarMoviesResource.read(props.cache, props.movieId);
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

export default withCache(SimilarMovies);
