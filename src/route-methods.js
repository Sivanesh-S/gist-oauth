const routes = require('./routes');
const axios = require('axios');

const api = 'https://api.github.com';

const withAuthToken = accessToken => {
  const requestAPI = async (route, method, data) => {
    if (method === 'GET') {
      try {
        const response = await axios.get(`${api}${route}?${data}`, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        });
        return Promise.resolve(response.data);
      } catch (err) {
        return Promise.reject(err);
      }
    } else if (method === 'POST') {
    }
  };

  const getGists = (since = '') => {
    const qs = since ? `since=${since}` : '';
    return requestAPI(routes.getGists, 'GET', qs);
  };

  return {
    getGists
  };
};

module.exports = withAuthToken;
