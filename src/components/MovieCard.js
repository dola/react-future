import React from 'react';
import PropTypes from 'prop-types';
import {Card, Dimmer, Rating, Icon, Loader, Image} from 'semantic-ui-react';
import {DateTime} from 'luxon';

import {getImageUrl} from '../api';

function MovieCard(props) {
  const m = props.movie;
  const onClickMovie = () => {
    if (props.onClick) {
      props.onClick(m.id);
    }
  };
  const releaseDate = DateTime.fromISO(m.release_date);
  return (
    <Card centered key={m.id} onClick={onClickMovie}>
      {m.poster_path && (
        <Image src={getImageUrl(m.poster_path)} alt={m.title} />
      )}
      <Dimmer active={props.loading} inverted>
        <Loader>Loading</Loader>
      </Dimmer>
      <Card.Content>
        <Card.Header>{m.title}</Card.Header>
        <Card.Meta>
          {props.compact ? (
            <Rating
              rating={Math.ceil(m.vote_average / 2)}
              maxRating={5}
              disabled
              size="tiny"
            />
          ) : (
            <Rating rating={m.vote_average} maxRating={10} disabled />
          )}
        </Card.Meta>
        {!props.compact && <Card.Description>{m.overview}</Card.Description>}
      </Card.Content>
      <Card.Content extra>
        <Icon name="calendar" />
        {!props.compact && 'Released on'} {releaseDate.toLocaleString()}
      </Card.Content>
    </Card>
  );
}

MovieCard.defaultProps = {
  compact: false,
  onClick: null,
  loading: false,
};

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  compact: PropTypes.bool,
  loading: PropTypes.bool,
};

export default MovieCard;
