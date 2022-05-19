import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from "react-redux";

import Header from './components/Header';
import { Feed, Item, User } from './pages';

function App() {
  return (
    <div>
      <Header />
      <div>
        <Switch>
        <Route path="/" exact component={Feed} />
          {/* <Route path="/item/:id" component={Item} />
          <Route path="/user/:id" component={User} />
          <Route path="/news/:page" component={Feed} />
          <Route path="/newest/:page" component={Feed} />
          <Route path="/show/:page" component={Feed} />
          <Route path="/ask/:page" component={Feed} />
          <Route path="/jobs/:page" component={Feed} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(connect(null,null)(App));
