import {Meteor} from 'meteor/meteor'
import {Accounts} from 'meteor/accounts-base'
import {AUTH_LOGIN, AUTH_LOGOUT} from '../constants'

export default function authSubscribe(next) {
  return (reducer, preloadedState, enhancer) => {
    const store = next(reducer, preloadedState, enhancer)
    Accounts.onLogin(() => {
      store.dispatch({type: AUTH_LOGIN})
    })
    Accounts.onLogout(() => {
      store.dispatch({type: AUTH_LOGOUT})
    })
    return store
  }
}