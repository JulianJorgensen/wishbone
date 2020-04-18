import React from 'react';
import {Route, Router, IndexRoute, browserHistory} from 'react-router';

import Main from 'containers/Main';
import Index from 'containers/Index';
import Collections from 'containers/Collections';
import Collection from 'containers/Collection/Index';
import Login from 'presentational/Login';
import NewsItem from 'containers/NewsItem';
import PageItem from 'containers/PageItem';

import ReactGA from 'react-ga';
// ReactGA.initialize('UA-6241825-9'); // initialize Google Analytics

let {connect} = require('react-redux');
let store = require('store/configureStore').configure();

function logPageView(location) {
  ReactGA.set({ page: location.pathname });
  ReactGA.pageview(location.pathname);
}

browserHistory.listen((location) => {
  logPageView(location);

  // scroll to top when changing page
  window.scrollTo(0, 0);
});

export default (
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <IndexRoute path="/" component={Index} />
      <Route path="hats" component={Collections} />
      <Route path="hat/:collectionId" component={Collection} />
      <Route path="login" component={Login} />
      <Route path="about" component={PageItem} />
      <Route path="contact" component={PageItem} />
      <Route path="news/:postId" component={NewsItem} />
    </Route>
  </Router>
);
