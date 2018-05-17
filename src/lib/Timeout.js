import React from 'react';

function Timeout({ms, fallback, children}) {
  return (
    <React.Timeout ms={ms}>
      {didTimeout => (didTimeout ? fallback : children)}
    </React.Timeout>
  );
}

export default Timeout;
