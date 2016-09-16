import {createStore, applyMiddleware, compose, combineReducers} from 'redux'
import createSagaMiddleware from 'redux-saga'
import {fork, take} from 'redux-saga/effects'
import thunk from 'redux-thunk'
import auth from './auth'
import meteor from './meteor'
import reducers from '../reducer'
import {browserHistory} from 'react-router'
import {routerReducer, routerMiddleware} from 'react-router-redux'
import configurePostSaga from './sagas/post'

function* logActions() {
  while (true) {
    const action = yield take() // correct
    console.log(action)
  }
}

function* rootSaga(store) {
  yield fork(logActions)
  yield fork(configurePostSaga, store)
}

export default function configureStore(preloadedState) {
  const reducer = combineReducers({
    ...reducers,
    routing: routerReducer
  })
  const sagaMiddleware = createSagaMiddleware()
  const router = routerMiddleware(browserHistory)
  const store = createStore(reducer, preloadedState, compose(
    auth,
    meteor,
    applyMiddleware(router, thunk, sagaMiddleware),
    window.devToolsExtension ? window.devToolsExtension(): next => next
  ))
  sagaMiddleware.run(rootSaga, store)

  window.store = store //Just for test

  return store
}