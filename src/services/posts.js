export function getAllPosts() {
  return fetch(process.env.REACT_APP_API_URL + '/posts/all', {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
}
