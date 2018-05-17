# Demo

    git checkout synchronous
    npm start

1.  Show app with mock data
    * Loads instantly
    * Is responsive
    * needs no loaders
2.  What if we want to fetch data from remote?
    * Introduce `simple-cache-provider` in `SearchResults.js`
      * `const moviesSearchResource = createResource(searchMovies);`
      * `const movies = moviesSearchResource.read(props.cache, props.query).results;`
      * `withCache` HOC
      * Home.js: `<Timeout ms={1000} fallback={<Loader active inline="centered" />}>`
      * Demo again
    * Do the same for the MovieDetail
      * `const movieDetailResource = createResource(fetchMovie);`
      * `withCache` HOC
      * `const movie = movieDetailResource.read(props.cache, props.movieId);`
      * Can use same `<Timeout/>` as for `SearchResults`
    * To stay responsive, we don't want to show the loader on the full page.
      * Use `AsyncState` to prioritzie state updates.
        * User input is high priority and should be rendered immediately
        * Network response is low priority and can be done asynchronously
        * `const asyncState = { query: this.state.query, showDetail: this.state.showDetail};`
        * ```
          <AsyncValue
            value={asyncState}
            defaultValue={{query: '', showDetail: false}}>
            {asyncState =>
              asyncState.showDetail && this.state.detailId
                ? this.renderDetail(this.state.detailId)
                : this.renderList(asyncState.query, asyncState.showDetail)
            }
          </AsyncValue>
          ```
        * In renderList():
          ```
          const isSearching = asyncQuery !== this.state.query;
          const isLoadingDetail = asyncShowDetail !== this.state.showDetail;
          ```
        * And then SearchResults with
          ```
          loadingId={isLoadingDetail ? this.state.detailId : null}
          ```
    * If time: Prefetching
      * In `SearchResults.js`:
        ```
        <div hidden={true}>
          {/* Preload the first three MovieDetail components */}
          {movies.slice(0, 3).map(m => <MovieDetail movieId={m.id} />)}
        </div>
        ```
    * Full example: `git checkout master`
      * Show that loading does really not block rendering
      * Obsolete updates are canceled
      * Async updates are rebased
