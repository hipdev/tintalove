import { UserState } from 'types/user'

export function getUser(state: UserState, payload) {
  return {
    ...state,
    user: payload,
  }
}

export function login(state, payload) {
  return {
    ...state,
    login: payload,
  }
}
