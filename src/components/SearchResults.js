import React from 'react';
import PropTypes from 'prop-types';
import {Card, Container, Image, Icon, Rating} from 'semantic-ui-react';

import searchJsonResponse from '../mock/search.json';
import {getImageUrl} from '../api';

function SearchResults(props) {
  const movies = searchJsonResponse.results;
  return (
    <Container>
      <Card.Group>
        {movies.map(m => (
          <Card onClick={() => props.onSelectMovie(m.id)} centered key={m.id}>
            <Image src={getImageUrl(m.poster_path)} />
            <Card.Content>
              <Card.Header>{m.title}</Card.Header>
              <Card.Meta>
                <Rating rating={m.vote_average} maxRating={10} disabled />
              </Card.Meta>
              <Card.Description>{m.overview}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name="calendar" />
              Released on {m.release_date}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

SearchResults.propTypes = {
  onSelectMovie: PropTypes.func.isRequired,
};

export default SearchResults;
