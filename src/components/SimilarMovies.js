import React from 'react';
import PropTypes from 'prop-types';
import {Container, Card, Icon, Image, Header, Rating} from 'semantic-ui-react';

import similarMoviesJson from '../mock/similar.json';
import {getImageUrl} from '../api';

function SimilarMovies(props) {
  const similarMovies = similarMoviesJson.results.slice(0, 5);
  return (
    <Container>
      <Header as="h3" dividing>
        Similar Movies
      </Header>
      <Card.Group doubling itemsPerRow={4}>
        {similarMovies.map(m => (
          <Card centered key={m.id}>
            <Image src={getImageUrl(m.poster_path)} />
            <Card.Content>
              <Card.Header>{m.title}</Card.Header>
              <Card.Meta>
                <Rating
                  rating={Math.ceil(m.vote_average / 2)}
                  maxRating={5}
                  disabled
                  size="tiny"
                />
              </Card.Meta>
            </Card.Content>
            <Card.Content extra>
              <Icon name="calendar" />
              {m.release_date}
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </Container>
  );
}

SimilarMovies.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default SimilarMovies;
