export const HOSTNAME=""

export const get = url => {
  return new Promise(((resolve, reject) => {
    fetch(`${HOSTNAME}${url}`)
      .then(response => response.json())
      .then(result => {
        resolve(result);
      })
      .catch(error => {
        reject(error);
      });
  }));
}

export const post = (url, data, method = "POST") => {
  return new Promise(((resolve, reject) => {
    fetch(`${HOSTNAME}${url}`, {
        method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      // .then(response => response.json())
      .then(result => {
        if (result.errors) {
          reject(result)
        } else {
          resolve(result)
        }
      })
      .catch(error => {
        reject(error);
      });
  }));
}