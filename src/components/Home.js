import React from 'react';
import {Input, Icon, Menu, Container, Button} from 'semantic-ui-react';

import SearchResults from './SearchResults';
import MovieDetail from './MovieDetail';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      detailId: null,
    };
    this.onSelectMovie = this.onSelectMovie.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextState.detailId !== this.state.detailId) {
      window.scrollTo(0, 0);
    }
  }

  onSelectMovie(movieId) {
    this.setState({
      detailId: movieId,
    });
  }

  render() {
    return (
      <>
        <Menu>
          {this.state.detailId ? (
            <Menu.Item onClick={() => this.setState({detailId: null})}>
              <Button icon labelPosition="left">
                <Icon name="left arrow" />
                Back
              </Button>
            </Menu.Item>
          ) : (
            <Menu.Item>
              <Input
                icon="search"
                placeholder="Search Movie..."
                value={this.state.query}
                onChange={(e, p) => this.setState({query: p.value})}
              />
            </Menu.Item>
          )}
        </Menu>

        {this.state.detailId ? (
          <MovieDetail movieId={this.state.detailId} />
        ) : (
          <SearchResults onSelectMovie={this.onSelectMovie} />
        )}
      </>
    );
  }
}

export default Home;
