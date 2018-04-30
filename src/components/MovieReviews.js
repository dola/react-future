import React from 'react';
import PropTypes from 'prop-types';
import {Button, Comment, Header} from 'semantic-ui-react';

import movieReviewsJson from '../mock/reviews.json';
import {getImageUrl} from '../api';

function MovieReviews(props) {
  const reviews = movieReviewsJson.results;
  return (
    <Comment.Group>
      <Header dividing>Reviews</Header>
      {reviews.map(review => (
        <Comment key={review.id}>
          <Comment.Content>
            <Comment.Author>{review.author}</Comment.Author>
            <Comment.Text>{review.content}</Comment.Text>
            <Comment.Actions>
              <Comment.Action as="a" href={review.url}>
                Open in Browser
              </Comment.Action>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      ))}
    </Comment.Group>
  );
}

MovieReviews.propTypes = {
  movieId: PropTypes.number.isRequired,
};

export default MovieReviews;
