import {POST_CREATE, POST_VOTE} from '../constants'

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
      postId
    }
  }
}
