import {combineReducers} from 'redux'
import {POST_LOAD, POST_APPEND, POST_PRIVATE_LOAD, AUTH_LOGOUT} from '../constants'

function public(state = [], action) {
  switch(action.type) {
    case POST_APPEND:
      if (!action.payload.hidden) {
        return [action.payload, ...state]
      } else {
        return state
      }
    case POST_LOAD:
      return [...state, ...action.payload]
    default: 
      return state
  }
}

function hidden(state = [], action) {
  switch(action.type) {
    case POST_APPEND:
      if (action.payload.hidden) {
        return [action.payload, ...state]
      } else {
        return state
      }
    case POST_PRIVATE_LOAD:
      return [...state, ...action.payload]
    case AUTH_LOGOUT:
      return []
    default: 
      return state
  }
}

export default combineReducers({
  public,
  hidden
})
