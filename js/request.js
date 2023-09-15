class ErrorResponse extends Error {
    constructor(status, message) {
      super(status);
      this.message = message;
    }
}

function customFetch(url) {
    return new Promise(async (resolve, reject) => {
      let res = await fetch(url);
      if (res.status === 200 && res.ok === true) {
        let data = await res.json();
        resolve(data.data);
      } else {
        reject(new ErrorResponse(res.status, "Error"));
      }
    });
}



