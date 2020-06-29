const headerSet = () => {
  const h = new Headers();
  h.append('Content-Type', 'application/json');
  const token = localStorage.getItem('TOKEN');
  h.append('token', token);
  return h;
};


export function getLoginName(data) {
  return fetch('http://localhost:3000/login', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .catch(error => console.error('Error:', error)); //eslint-disable-line
}

export function tokenCheck(token) {
  return fetch('http://localhost:3000/auth', {
    method: 'POST',
    body: JSON.stringify(token),
    headers: { 'Content-Type': 'application/json' },
  })
    .then(res => res.json())
    .catch(error => console.log(error)); //eslint-disable-line
}

export function getNewKingdomName(data) {
  return data;
}

export function postData(data, endpoint) {
  return fetch(endpoint, {
    method:
      'POST',
    body: JSON.stringify(data),
    headers: headerSet(),
  })
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then(resdata => resdata);
}


export function putData(data, endpoint) {
  return fetch(endpoint, { method: 'PUT', body: JSON.stringify(data), headers: headerSet() })
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then(resdata => resdata);
}

export function getData(endpoint) {
  return fetch(endpoint, { method: 'GET', headers: headerSet() })
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then(resdata => resdata);
}

export function sendMap(data, endpoint) {
  return fetch(endpoint, { method: 'PUT', body: JSON.stringify(data), headers: { 'Content-Type': 'application/json' } })
    .then(dataWrappedByPromise => dataWrappedByPromise.json())
    .then(resdata => resdata);
}
