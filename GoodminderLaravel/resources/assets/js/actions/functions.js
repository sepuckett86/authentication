export const makeOptionsWithToken = () => {
  const token = localStorage.getItem('id_token');
  const options = {
    'headers': {
      'Authorization': 'Bearer ' + token,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }
  return options
}
