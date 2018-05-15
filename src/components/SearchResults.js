import React from 'react';
import PropTypes from 'prop-types';
import {Card, Container, Message} from 'semantic-ui-react';

import MovieCard from './MovieCard';

import moviesSearchResultJson from '../mock/search.json';

function SearchResults(props) {
  if (props.query.trim() === '') {
    return (
      <Container>
        <Message>Please enter a search term</Message>
      </Container>
    );
  }

  const movies = moviesSearchResultJson.results;
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
    </Container>
  );
}

SearchResults.defaultProps = {
  loadingId: null,
};

SearchResults.propTypes = {
  query: PropTypes.string.isRequired,
  loadingId: PropTypes.number,
  onSelectMovie: PropTypes.func.isRequired,
};

export default SearchResults;
