import * as types from './actionTypes';

const initialState = {
  posts: [],
}

export default function(state = initialState, action) {
  switch (action.type) {
    case types.POSTS_FETCHED:
      return {
        ...state,
        posts: action.posts
      }
    default:
      return state;
  }
}
