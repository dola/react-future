import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Rating,
  Container,
  Header,
  Loader,
  Divider,
  Label,
  List,
  Statistic,
} from 'semantic-ui-react';
import { createResource } from 'simple-cache-provider';
import numeral from 'numeral';
import { DateTime } from 'luxon';
import get from 'lodash.get';

import { getImageUrl, fetchMovie } from '../api';
import withCache from '../lib/withCache';
import SimilarMovies from './SimilarMovies';
import AsyncImage from '../lib/AsyncImage';
import Timeout from '../lib/Timeout';

function getIMDbUrl(movie) {
  return `https://www.imdb.com/title/${movie.imdb_id}`;
}

const movieDetailResource = createResource(fetchMovie);

class MovieDetail extends React.Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    const props = this.props;
    const movie = movieDetailResource.read(props.cache, props.movieId);

    const releaseDate = DateTime.fromISO(movie.release_date);
    return (
      <Container>
        <Grid centered stackable>
          <Grid.Column width={4} textAlign="center">
            {movie.poster_path && (
              <AsyncImage
                src={getImageUrl(movie.poster_path)}
                className="ui image centered"
                alt={movie.title}
              />
            )}
            <Rating rating={movie.vote_average} maxRating={10} disabled />
            <Statistic.Group size="tiny" widths={2}>
              <Statistic>
                <Statistic.Value>
                  {numeral(movie.budget).format('($ 0 a)')}
                </Statistic.Value>
                <Statistic.Label>Budget</Statistic.Label>
              </Statistic>
              <Statistic>
                <Statistic.Value>
                  {numeral(movie.revenue).format('($ 0.0 a)')}
                </Statistic.Value>
                <Statistic.Label>Revenue</Statistic.Label>
              </Statistic>
            </Statistic.Group>
          </Grid.Column>
          <Grid.Column width={12}>
            <Container text>
              <Header>
                {movie.title} ({releaseDate.toFormat('yyyy')})
              </Header>
              <Label.Group>
                {movie.genres.map(g => <Label key={g.id}>{g.name}</Label>)}
              </Label.Group>
              <p>{movie.overview}</p>
              <List bulleted horizontal link>
                <List.Item>{movie.runtime} min</List.Item>
                <List.Item>{get(movie, 'spoken_languages[0].name')}</List.Item>
                <List.Item>
                  {releaseDate.toLocaleString()} ({get(
                    movie,
                    'production_countries[0].iso_3166_1',
                  )})
                </List.Item>
                <List.Item as="a" href={getIMDbUrl(movie)} target="_blank">
                  IMDb
                </List.Item>
                {movie.homepage && (
                  <List.Item as="a" href={movie.homepage} target="_blank">
                    Website
                  </List.Item>
                )}
              </List>
            </Container>
            <Divider hidden />
            <SimilarMovies movieId={props.movieId} />
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

MovieDetail.propTypes = {
  movieId: PropTypes.number.isRequired,
  cache: PropTypes.object.isRequired,
};

export default withCache(MovieDetail);
