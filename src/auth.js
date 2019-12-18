const axios = require('axios');

// user defined packages
const apis = require('./route-methods');

module.exports = connect = (
  app,
  { clientId, clientSecret, redirectURL },
  callback
) => {
  // need to do it also for promises.
  return new Promise((response, reject) => {
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
              callback(
                new Error(
                  `Client's  ID, secret, code any of them is incorrect. Check them`
                )
              );
              // return;
            }
            callback(null, apis(response.data.access_token));
          })
          .catch(error => {
            if (error) {
              callback(new Error('Issue in Fetching POST'));
            }
          });
      } else {
        callback(new Error('Not a Valid Code.'));
      }
    });
  });
};
