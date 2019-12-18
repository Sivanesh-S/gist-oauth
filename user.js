const express = require('express');
const app = express();

const githubAPI = require('./src/index');

const PORT = 3012;
const clientId = '7a15a92e678bc58070a0';
const clientSecret = '5b721c1ed9fc10704aca38e6d9e37bdc46a0c221';

const githubAuthLink = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=gist`;

app.get('/', async (req, res) => {
  res.send(
    `<h1>Github Login </h1><a href=${githubAuthLink}> Login using Github</a>`
  );
});

githubAPI.getAuthToken(
  app,
  {
    clientId,
    clientSecret,
    redirectURL: '/oauth-call'
  },
  (err, gistMethods) => {
    if (err) {
      console.log('err:', err);
      return;
    }

    gistMethods
      .getForksList('47368346532f0036963c87354fbe8a22')
      .then(res => {
        // res.forEach(gist => console.log('gist.id:', gist.id));
        console.log('res:', res);
      })
      .catch(err => console.log('err:', err));
    // githubAPI
  }
);

app.listen(PORT, () => console.log('App is listening at port', PORT));
