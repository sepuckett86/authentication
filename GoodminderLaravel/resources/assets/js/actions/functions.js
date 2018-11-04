export const optionsWithToken = () => {
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

export const tokenInLocalStorage = () => {
  if (localStorage.getItem('id_token')) {
    return true;
  } else {
    return false;
  }
}
