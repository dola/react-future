import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Rating,
  Container,
  Sticky,
  Header,
  Image,
  Divider,
  Label,
} from 'semantic-ui-react';

import movieDetailJson from '../mock/detail.json';
import {getImageUrl} from '../api';
import SimilarMovies from './SimilarMovies';

function MovieDetail(props) {
  const movie = movieDetailJson;
  return (
    <Container>
      <Grid centered stackable>
        <Grid.Column width={4} textAlign="center">
          <Image src={getImageUrl(movie.poster_path)} centered />
          <Rating rating={movie.vote_average} maxRating={10} disabled />
        </Grid.Column>
        <Grid.Column width={12}>
          <Container text>
            <Header>
              {props.movieId} - {movie.title}
            </Header>
            <Label.Group>
              {movie.genres.map(g => <Label>{g.name}</Label>)}
            </Label.Group>
            <p>{movie.overview}</p>
          </Container>
          <Divider hidden />
          <SimilarMovies movieId={props.movieId} />
        </Grid.Column>
      </Grid>
    </Container>
  );
}

MovieDetail.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieDetail;
