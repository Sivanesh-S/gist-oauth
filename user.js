const express = require('express');
const app = express();

const githubAPI = require('github-oauth-express');

const getGistAPI = require('./src/route-methods');

const PORT = 3012;
const clientId = '7a15a92e678bc58070a0';
const clientSecret = '5b721c1ed9fc10704aca38e6d9e37bdc46a0c221';

const githubAuthLink = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`;

app.get('/', async (req, res) => {
  res.send(
    `<h1>Github Login </h1><a href=${githubAuthLink}> Login using Github</a>`
  );
});
// Callbacks
githubAPI(
  app,
  {
    clientId,
    clientSecret,
    redirectURL: '/oauth-call'
  },
  (err, authToken) => {
    if (err) {
      console.log('err:', err);
      return;
    }

    console.log('authToken:', authToken);
    const gistAPI = getGistAPI(authToken);
    gistAPI
      .getGists()
      .then(res => console.log('res:', res))
      .catch(err => console.log('err:', err));
  }
);

// Promises
// githubAPI(app, {
//   clientId,
//   clientSecret,
//   redirectURL: '/oauth-call'
// })
//   .then(res => {
//     console.log('res:', res);
//   })
//   .catch(err => console.log(err));

app.listen(PORT, () => console.log('App is listening at port', PORT));
