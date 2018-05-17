import React from 'react';
import {Input, Icon, Menu, Button} from 'semantic-ui-react';

import SearchResults from './SearchResults';
import MovieDetail from './MovieDetail';
import AsyncValue from '../lib/AsyncValue';

class Home extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      detailId: null,
      showDetail: false,
    };
    this.onSelectMovie = this.onSelectMovie.bind(this);
    this.onNavigateBack = this.onNavigateBack.bind(this);
  }

  onSearchChange(query) {
    this.setState({query});
  }

  onSelectMovie(movieId) {
    this.setState({
      detailId: movieId,
      showDetail: true,
    });
  }

  onNavigateBack() {
    this.setState({detailId: null, showDetail: false});
  }

  renderDetail(movieId) {
    return (
      <>
        <Menu size="large">
          <Menu.Item onClick={this.onNavigateBack}>
            <Button icon labelPosition="left">
              <Icon name="left arrow" />
              Back
            </Button>
          </Menu.Item>
        </Menu>
        <MovieDetail movieId={this.state.detailId} />
      </>
    );
  }

  renderList(asyncQuery, asyncShowDetail) {
    const isSearching = asyncQuery !== this.state.query;
    const isLoadingDetail = asyncShowDetail !== this.state.showDetail;
    return (
      <>
        <Menu size="large">
          <Menu.Item>
            <Input
              icon="search"
              placeholder="Search Movie..."
              value={this.state.query}
              onChange={(e, p) => this.onSearchChange(p.value)}
              loading={isSearching}
              size="big"
            />
          </Menu.Item>
        </Menu>
        <SearchResults
          query={asyncQuery}
          loadingId={isLoadingDetail ? this.state.detailId : null}
          onSelectMovie={this.onSelectMovie}
        />
      </>
    );
  }

  render() {
    const asyncState = {
      query: this.state.query,
      showDetail: this.state.showDetail,
    };
    return (
      <AsyncValue
        value={asyncState}
        defaultValue={{query: '', showDetail: false}}>
        {asyncState =>
          asyncState.showDetail && this.state.detailId
            ? this.renderDetail(this.state.detailId)
            : this.renderList(asyncState.query, asyncState.showDetail)
        }
      </AsyncValue>
    );
  }
}

export default Home;
