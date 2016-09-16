import {combineReducers} from 'redux'
import {
  POST_LOAD,
  POST_VOTE,
  POST_APPEND,
  POST_PRIVATE_LOAD,
  POST_EDIT,
  POST_UPDATE,
  POST_DELETE,
  AUTH_LOGOUT
} from '../constants'

function vote(state, postId, vote) {
  const index = state.findIndex(post => post._id == postId)
  if (index == -1) return state
  let post = state[index]
  if (post.votes.filter(v => v.creator == vote.creator).length) {
    return state
  }
  post = {
    ...post,
    votes: [...post.votes, vote]
  }
  return [
    ...state.slice(0, index),
    post,
    ...state.slice(index + 1, state.length)
  ]
}

function editMode(state, postId, user) {
  const index = state.findIndex(post => post._id == postId)
  if (index == -1) return state
  let post = state[index]
  if (post.creator == user) {
    return [
      ...state.slice(0, index),
    {
      ...post,
      edit: true
    },
    ...state.slice(index + 1, state.length)
    ]
  } else {
    return state
  }
}

function update(hidden, state, postId, data) {
  const index = state.findIndex(post => post._id == postId)
  if (index == -1) {
    if (hidden != data.hidden) {
      return state
    } else {
      return [
        ...state,
        {
          ...data,
          hidden: false
        }
      ].sort((p1, p2) => {//Place with correct position
        if (p1.createdAt > p2.createdAt) {
          return 1
        } else if (p1.createdAt == p2.createdAt) {
          return 0
        } else {
          return -1
        }
      })
    }
  } else if (hidden != data.hidden) {
    return [
      ...state.slice(0, index),
      ...state.slice(index + 1, state.length)
    ]
  }
  let post = state[index]
  if (data.hidden != data.hidden) {
    return [
      ...state.slice(0, index),
      {
        ...post,
        title: data.title,
        body: data.body,
        hidden: data.hidden,
        edit: false
      },
      ...state.slice(index + 1, state.length)
    ]
  }
  return [
    ...state.slice(0, index),
    {
      ...post,
      title: data.title,
      body: data.body,
      hidden: data.hidden,
      edit: false
    },
    ...state.slice(index + 1, state.length)
  ]
}

function public(state = [], action) {
  switch(action.type) {
    case POST_APPEND:
      if (!action.payload.hidden) {
        return [...state, action.payload]
      } else {
        return state
      }
    case POST_LOAD:
      return [...state, ...action.payload]
    case POST_VOTE:
      return vote(state, action.payload.postId, action.payload.vote)
    case POST_EDIT:
      return editMode(state, action.payload.postId, action.payload.user)
    case POST_UPDATE:
      return update(false, state, action.payload.postId, action.payload.data)
    default: 
      return state
  }
}

function hidden(state = [], action) {
  switch(action.type) {
    case POST_APPEND:
      if (action.payload.hidden) {
        return [...state, action.payload]
      } else {
        return state
      }
    case POST_PRIVATE_LOAD:
      return [...state, ...action.payload]
    case POST_VOTE:
      return vote(state, action.payload.postId, action.payload.vote)
    case POST_EDIT:
      return editMode(state, action.payload.postId, action.payload.user)
    case POST_UPDATE:
      return update(true, state, action.payload.postId, action.payload.data)
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
