const axios = require('axios');

// user defined packages
const apis = require('./route-methods');

module.exports = connect = (
  app,
  { clientId, clientSecret, redirectURL },
  callback
) => {
  if (!app.get) {
    return Promise.reject(
      `Error: Send Express's app instance in getAuthToken method.`
    );
  }

  const errorString = isAllExists(clientId, clientSecret, redirectURL);
  if (errorString) {
    return returnReject(errorString, callback);
  }

  // need to do it also for promises.
  return new Promise((response, reject) => {
    const returnAsync = isError => (data, callback) => {
      if (isError) {
        const error = new Error(data);
        if (callback) return callback(error);
        return reject(error);
      } else {
        if (callback) return callback(null, data);
        return response(data);
      }
    };

    const returnResolve = returnAsync(false);
    const returnReject = returnAsync(true);

    app.get('/', async (req, res) => {
      res.send(`<h1>Github Login </h1><a> Login using Github</a>`);
    });

    app.get(redirectURL, async (req, res) => {
      const { query } = req;
      const { code } = query;
      if (code) {
        const jsonBody = {
          code,
          client_id: clientId,
          client_secret: clientSecret
        };

        axios
          .post('https://github.com/login/oauth/access_token', jsonBody, {
            headers: {
              Accept: 'application/json'
            }
          })
          .then(response => {
            if (!response.data.access_token) {
              return returnReject(
                `Client's  ID, secret, code any of them is incorrect. Check them`
              );
            }
            return returnResolve(apis(response.data.access_token), callback);
          })
          .catch(error => {
            if (error) {
              returnReject('Issue in fetching POST', error);
            }
          });
      } else {
        callback(new Error('Not a Valid Code.'));
      }
      res.send('DONE');
    });
  });
};

function isAllExists(client_id, client_secret, redirectURL) {
  let errorString = '';
  if (!client_id) errorString = 'client_id is not defined';
  if (!client_secret) errorString = 'client_secret is not defined';
  if (!redirectURL) errorString = 'redirectURL is not defined';
  return errorString;
}
