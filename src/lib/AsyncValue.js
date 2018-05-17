import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

class AsyncValue extends React.Component {
  state = {asyncValue: this.props.defaultValue};

  componentDidMount() {
    ReactDOM.unstable_deferredUpdates(() => {
      this.setState((state, props) => ({asyncValue: props.value}));
    });
  }

  componentDidUpdate() {
    if (this.props.value !== this.state.asyncValue) {
      ReactDOM.unstable_deferredUpdates(() => {
        this.setState((state, props) => ({asyncValue: props.value}));
      });
    }
  }

  render() {
    return this.props.children(this.state.asyncValue);
  }
}

AsyncValue.propTypes = {
  defaultValue: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default AsyncValue;
