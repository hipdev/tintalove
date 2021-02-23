export function getUser(state, payload) {
  return {
    ...state,
    user: payload,
  };
}

export function login(state, payload) {
  return {
    ...state,
    login: payload,
  };
}
