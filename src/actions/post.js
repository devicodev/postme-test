import {POST_CREATE} from '../constants'

export function createPost(payload) {
  return {
    type: POST_CREATE,
    payload
  }
}
