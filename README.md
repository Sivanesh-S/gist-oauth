# gist-oauth

- A small library (< 5kb) through which we can call all Gist APIs provided by [github](https://developer.github.com/v3/gists/).
- If it is an **express application**, It is recommended to use with [github-oauth-express](https://npmjs.com/package/github-oauth-express) for OAuth. A small `< 6kb` package. _(A five min simple implementation for getting github Auth token)_
- Or else you can use your own way of getting OAuth Token from github. _As `authToken` is essential for accessing user specific datas._

```
npm install --save github-oauth-express gist-oauth
```

# Contents

- [Initial Setup](#initial-setup)
- [APIs](#apis)
  - [List a user's gists](#list-a-users-gists)
  - [List all public gists](#list-all-public-gists)
  - [List starred gists](#list-starred-gists)
  - [Get a single gist](#get-a-single-gist)
  - [Get a specific revision of a gist](#get-a-specific-revision-of-a-gist)
  - [Create a gist](#create-a-gist)
  - [Edit a gist](#edit-a-gist)
  - [List gist commits](#list-gist-commits)
  - [Star a gist](#star-a-gist)
  - [Unstar a gist](#unstar-a-gist)
  - [Check if a gist is starred](#check-if-a-gist-is-starred)
  - [Fork a gist](#fork-a-gist)
  - [List gist forks](#list-gist-forks)
  - [Delete a gist](#delete-a-gist)

# Initial Setup

```js
const express = require('express');
const app = express();

const githubAPI = require('github-oauth-express');
const gistOAuth = require('gist-oauth');

// YOUR EXPRESS APPLICATION

githubAPI(
  app, // Send your app instance to get OAuth Access
  {
    clientId: 'YOUR_CLIENT_ID',
    clientSecret: 'YOUR_CLIENT_SECRET',
    redirectURL: '/oauth-call'
  }
)
  .then(authToken => {
    console.log('Obtained Auth token');
    const gistAPI = gistOauth(authToken);

    // gistAPI provides all Gist's API
    // For Eg:
    gistAPI
      .getGists() // returns all public and secret gists of that user.
      .then(res => console.log('res:', res))
      .catch(err => console.log('err:', err));
  })
  .catch(err => console.log(err));
```

# APIs

- Every API returns a promise. Results are obtained in resolved object. So if any error occured during the process then it will be rejected.

## List a user's gists

**Parameters**

- **`since`** - `optional` This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Only gists updated at or after this time are returned.

```js
gistAPI
  .getGists(since) // returns all public and secret gists of that user.
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response)

## List all public gists

**Parameters**

- **`since`** - `optional` This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Only gists updated at or after this time are returned.

```js
gistAPI
  .getPublic(since)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response-1)

## List starred gists

**Parameters**

- **`since`** - `optional` This is a timestamp in ISO 8601 format: YYYY-MM-DDTHH:MM:SSZ. Only gists updated at or after this time are returned.

```js
gistAPI
  .getStarred(since)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response-2)

## Get a single gist

**Parameters**

- **gistId** - Particular ID of the gist obtained in above APIs.

```js
gistAPI
  .getGist(gistId)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response-3)

## Get a specific revision of a gist

**Parameters**

- **gistId** - Particular ID of the gist obtained in above APIs.
- **sha** - Particular file's SHA

```js
gistAPI
  .getSpecificRevision(gistId, sha)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response-4)

## Create a gist

**Parameters**

- **files** _(object)_ - List of files. They must be of format like

  ```js
  const files = {
    'file1.txt': {
      content: 'Entire file contents'
    },
    'file2.py': {
      content: "print('Hello world')"
    }
  };
  ```

- **description** _(string)_ - A small description about the gist.
- **isPublic** _(boolean)_ - `true` if public and `false` to create a secret gist.

```js
gistAPI
  .create(files, description, isPublic)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response-5)

## Edit a gist

**Parameters**

- **gistId** _(string)_ - Gist Id of the particular gist.
- **files** _(object)_ - Files of format

  ```js
  const files = {
    'file1.txt': {
      content: 'Entire file contents'
    },
    'file2.py': {
      content: "print('Hello world')"
    }
  };
  ```

  with edited contents.

- **description** _(string)_ - Updated description

```js
gistAPI
  .edit(gistId, files, description)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response-6)

## List gist commits

**Parameters**

- **gistId** _(string)_ - Gist Id of the particular gist.

```js
gistAPI
  .getCommitsList(gistId)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response-7)

## Star a gist

**Parameters**

- **gistId** _(string)_ - Gist Id of the particular gist.

```js
gistAPI
  .starGist(gistId)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

**Response** - If done - Just resolves, else rejects the promise.

## Unstar a gist

**Parameters**

- **gistId** _(string)_ - Gist Id of the particular gist.

```js
gistAPI
  .unStarGist(gistId)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

**Response** - If done - Just resolves, else rejects the promise.

## Check if a gist is starred

**Parameters**

- **gistId** _(string)_ - Gist Id of the particular gist.

```js
gistAPI
  .isGistStarred(gistId)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

**Response** - `true` if starred. `false` if unstarred.

## Fork a gist

**Parameters**

- **gistId** _(string)_ - Gist Id of the particular gist.

```js
gistAPI
  .forkGist(gistId)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response-10)

## List gist forks

**Parameters**

- **gistId** _(string)_ - Gist Id of the particular gist.

```js
gistAPI
  .getForksList(gistId)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

[**Response**](https://developer.github.com/v3/gists/#response-11)

## Delete a gist

**Parameters**

- **gistId** _(string)_ - Gist Id of the particular gist.

```js
gistAPI
  .deleteGist(gistId)
  .then(res => console.log('res:', res))
  .catch(err => console.log('err:', err));
```

**Response** - If done - Just resolves, else rejects the promise.

> For all API Responses refer [Gist Github API reference](https://developer.github.com/v3/gists/).
