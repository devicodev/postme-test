
import {Meteor} from 'meteor/meteor'
import {POST_LOAD_MORE} from '../constants'

export default function meteorSubscribe(next) {
  return (reducer, preloadedState, enhancer) => {
    const store = next(reducer, preloadedState, enhancer)
    //Subscribe to posts load
    Meteor.subscribe('posts', () => store.dispatch({type: POST_LOAD_MORE}))
    
    return store
  }
} 