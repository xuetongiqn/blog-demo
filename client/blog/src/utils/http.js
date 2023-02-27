export const HOSTNAME=""

export const get = url => {
  return new Promise(((resolve, reject) => {
    fetch(`${HOSTNAME}${url}`)
      .then(response=>{
        if(response.status==401){
          window.location.href= '/login'
        }else if(response.status==500){
          window.location.href= '/login'
        }
        return response;
      })
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
        if (!result.ok) {
          if(result.status == 401){
            window.location.href= '/login'
          }
          reject(result)
        } else {
          return result.json();
        }
      })
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