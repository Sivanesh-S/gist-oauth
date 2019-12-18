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
      try {
        const response = await axios.post(`${api}${route}`, data, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        });
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(error);
      }
    } else if (method === 'PATCH') {
      try {
        const response = await axios.patch(`${api}${route}`, data, {
          headers: {
            Authorization: `token ${accessToken}`
          }
        });
        return Promise.resolve(response.data);
      } catch (error) {
        return Promise.reject(error);
      }
    } else if (method === 'DELETE') {
    }
  };

  // GET Requests

  const get = (since = '') => {
    const qs = since ? `since=${since}` : '';
    return requestAPI(routes.get, 'GET', qs);
  };

  const getPublic = (since = '') => {
    const qs = since ? `since=${since}` : '';
    return requestAPI(routes.getPublic, 'GET', qs);
  };

  const getStarred = (since = '') => {
    const qs = since ? `since=${since}` : '';
    return requestAPI(routes.getStarred, 'GET', qs);
  };

  const getGist = id => {
    return requestAPI(routes.getGist(id), 'GET');
  };

  const getSpecificRevision = (id, sha) => {
    return requestAPI(routes.getSpecificRevision(id, sha), 'GET');
  };

  const getCommitsList = id => {
    return requestAPI(routes.getCommitsList(id), 'GET');
  };

  const isGistStarred = async id => {
    try {
      await requestAPI(routes.isGistStarred(id), 'GET');
      return true;
    } catch (err) {
      return false;
    }
  };
  const getForksList = id => {
    return requestAPI(routes.getForksList(id), 'GET');
  };

  // POST requests

  const create = (files, description, public) => {
    return requestAPI(routes.create, 'POST', {
      files,
      description,
      public
    });
  };

  const forkGist = gistId => {
    return requestAPI(routes.forkGist(gistId), 'POST');
  };

  const edit = (gistId, files, description) => {
    return requestAPI(routes.edit(gistId), 'PATCH', { files, description });
  };

  return {
    get,
    getPublic,
    getStarred,
    getGist,
    getSpecificRevision,
    getCommitsList,
    isGistStarred,
    getForksList,
    create,
    forkGist,
    edit
  };
};

module.exports = withAuthToken;
