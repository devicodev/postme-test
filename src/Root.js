/** @flow */
import React from 'react'
import configureStore from './store/configureStore'
import './config/auth'
import {Meteor} from 'meteor/meteor'
import {push} from 'react-router-redux'
import {Provider} from 'react-redux'
import {Router, Route, IndexRoute, browserHistory} from 'react-router'
import {syncHistoryWithStore} from 'react-router-redux'

import Layout from './components/Layout'
import PublicPost from './components/PublicPost'
import HiddenPost from './components/HiddenPost'
import BestPost from './components/BestPost'
import SinglePost from './components/SinglePost'

export default function Root() {
  const store = configureStore()
  const history = syncHistoryWithStore(browserHistory, store)
  const redirect = global
    ? (nextState, transition, callback) => {transition('/'), callback()}
    : () => store.dispatch(push('/'))
  const isAuthenticated = () => !!Meteor.userId()
  const auth = (params, transition, callback) => {
    isAuthenticated() ? callback() : redirect(params, transition, callback)
  }
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Layout}>
          <IndexRoute component={PublicPost}  />
          <Route path="posts/public" component={PublicPost} />
          <Route path="posts/public/best" component={BestPost} />
          <Route path="posts/private"  onEnter={auth} component={HiddenPost} />
          <Route path="posts/:id" component={SinglePost} />
        </Route>
      </Router>
    </Provider>
  )
}