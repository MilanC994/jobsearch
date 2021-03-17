import { LOGIN, LOGOUT, SET_LOGGED_IN } from './../constants'

const initialState = {
  user: {},
  loggedIn: false,
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN: {
      return {
        ...state,
        user: action.payload.user,
        loggedIn: true,
      }
    }

    case LOGOUT: {
      return {
        ...state,
        user: {},
        loggedIn: false,
      }
    }
    case SET_LOGGED_IN: {
      return {
        ...state,
        loggedIn: action.payload.loggedIn,
        user: {
          ...state.user,
          username: action.payload.username,
        },
      }
    }
    default: {
      return state
    }
  }
}

export default userReducer
