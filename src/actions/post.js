import {Meteor} from 'meteor/meteor'
import {POST_CREATE, POST_VOTE, POST_EDIT, POST_UPDATE, POST_DELETE} from '../constants'

export function createPost(payload) {
  return {
    type: POST_CREATE,
    payload
  }
}

export function votePost(postId) {
  return {
    type: POST_VOTE,
    payload: {
      postId,
      vote: {
        creator: Meteor.userId(),
        username: Meteor.users.findOne(Meteor.userId()).username 
      }
    }
  }
}

export function editPost(postId) {
  return {
    type: POST_EDIT,
    payload: {
      postId,
      user: Meteor.userId()
    }
  }
}

export function updatePost(postId, data) {
  return {
    type: POST_UPDATE,
    payload: {
      postId,
      data
    }
  }
}

export function deletePost(postId) {
  return {
    type: POST_DELETE,
    payload: {
      postId,
      user: Meteor.userId()
    }
  }
}
