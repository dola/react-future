import React from 'react';
import PropTypes from 'prop-types';
import { Card, Container, Message } from 'semantic-ui-react';
import { createResource } from 'simple-cache-provider';

import { searchMovies } from '../api';
import MovieCard from './MovieCard';
import withCache from '../lib/withCache';
import MovieDetail from './MovieDetail';

const moviesSearchResource = createResource(searchMovies);

function SearchResults(props) {
  if (props.query.trim() === '') {
    return (
      <Container>
        <Message>Please enter a search term</Message>
      </Container>
    );
  }

  const movies = moviesSearchResource.read(props.cache, props.query).results;
  return (
    <Container>
      <Card.Group>
        {movies.map(m => (
          <MovieCard
            movie={m}
            onClick={props.onSelectMovie}
            loading={m.id === props.loadingId}
            key={m.id}
          />
        ))}
      </Card.Group>
      {/* <div hidden={true}>
        {movies.slice(0, 3).map(m => <MovieDetail movieId={m.id} />)}
      </div> */}
    </Container>
  );
}

SearchResults.defaultProps = {
  loadingId: null,
};

SearchResults.propTypes = {
  cache: PropTypes.object.isRequired,
  query: PropTypes.string.isRequired,
  loadingId: PropTypes.number,
  onSelectMovie: PropTypes.func.isRequired,
};

export default withCache(SearchResults);
