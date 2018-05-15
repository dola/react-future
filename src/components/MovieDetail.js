import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  Rating,
  Container,
  Header,
  Divider,
  Label,
  List,
  Statistic,
  Image,
} from 'semantic-ui-react';
import numeral from 'numeral';
import {DateTime} from 'luxon';
import get from 'lodash.get';

import {getImageUrl} from '../api';
import SimilarMovies from './SimilarMovies';

import movieDetailJson from '../mock/detail.json';

function getIMDbUrl(movie) {
  return `https://www.imdb.com/title/${movie.imdb_id}`;
}

class MovieDetail extends React.Component {
  componentDidMount() {
    window.scroll(0, 0);
  }

  render() {
    const props = this.props;
    const movie = movieDetailJson;

    const releaseDate = DateTime.fromISO(movie.release_date);
    return (
      <Container>
        <Grid centered stackable>
          <Grid.Column width={4} textAlign="center">
            {movie.poster_path && (
              <Image
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
};

export default MovieDetail;
