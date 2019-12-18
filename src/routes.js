module.exports = {
  get: '/gists',
  getPublic: '/gists/public',
  getStarred: '/gists/starred',
  getGist: gistId => `/gists/${gistId}`,
  getSpecificRevision: (gistId, sha) => `/gists/${gistId}/${sha}`,
  getCommitsList: gistId => `/gists/${gistId}/commits`,
  isGistStarred: gistId => `/gists/${gistId}/star`,
  getForksList: gistId => `/gists/${gistId}/forks`,
  create: '/gists',
  forkGist: gistId => `/gists/${gistId}/forks`,
  edit: gistId => `/gists/${gistId}`,
  starGist: gistId => `/gists/${gistId}/star`,
  unStarGist: gistId => `/gists/${gistId}/star`,
  delete: gistId => `/gists/${gistId}`
};
