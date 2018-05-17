/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import {Image as SemanticImage} from 'semantic-ui-react';
import {createResource} from 'simple-cache-provider';
import withCache from './withCache';

function loadImage(src) {
  const image = new Image();
  return new Promise(resolve => {
    image.onload = () => resolve(src);
    image.src = src;
  });
}

const imageResource = createResource(loadImage);

function AsyncImage({cache, src, ...props}) {
  return <SemanticImage {...props} src={imageResource.read(cache, src)} />;
}

export default withCache(AsyncImage);
