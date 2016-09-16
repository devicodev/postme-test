
import {Meteor} from 'meteor/meteor'
import {POST_LOAD_MORE, POST_BEST_LOAD_MORE, POST_PRIVATE_GET} from '../constants'

export default function meteorSubscribe(next) {
  return (reducer, preloadedState, enhancer) => {
    const store = next(reducer, preloadedState, enhancer)
    //Subscribe to posts load
    Meteor.subscribe('posts', () => store.dispatch({type: POST_LOAD_MORE}) && store.dispatch({type: POST_BEST_LOAD_MORE}))
    Meteor.subscribe('posts:hidden', () => store.dispatch({type: POST_PRIVATE_GET}))
    
    return store
  }
} 