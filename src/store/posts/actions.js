import * as types from './actionTypes'
import * as services from '../../services/posts';

export function getAllPosts(message, liu) {
  return dispatch => {
    services.getAllPosts()
      .then(res => res.json())
      .then(posts => {
        dispatch({ type: types.POSTS_FETCHED, posts });
      });
  }
}
