class easyHTTP {
  // make HTTP GET Request
  async get (url) {
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData
  }

  // make HTTP POST Request
  async post (url, data) {
    return new Promise ((resolve, reject) => {
      fetch (url, {
        method: 'POST',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify(data)
      })
      .then (res => res.json())
      .then (data => resolve(data))
      .catch (err => reject(err))
    })
  }

  async put (url, data) {
    const response = await fetch (url, {
        method: 'PUT',
        headers: {
          'Content-type':'application/json'
        },
        body: JSON.stringify(data)
      })
    const responseData = await response.json();
    return responseData
  }

  async delete (url) {
    const response = await fetch (url, {
        method: 'DELETE',
        headers: {
          'Content-type':'application/json'
        }
      })
    const responseData = await 'Resource deleted...';
    return responseData
  }
}

export const http = new easyHTTP();