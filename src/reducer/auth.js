import {AUTH_LOGIN, AUTH_LOGOUT} from '../constants'

export default function auth(state = false, action) {
  switch(action.type) {
    case AUTH_LOGIN: return true
    case AUTH_LOGOUT: return false
    default: return state
  }
}
