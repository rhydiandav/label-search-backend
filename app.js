const express = require('express');
const queryStringify = require('querystringify');
const request = require('request');
const ENV = process.env.NODE_ENV || 'development';

const auth =
  ENV === 'production'
    ? {
        redirect_uri: process.env.REDIRECT_URI,
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET
      }
    : require('./auth');

const { redirect_uri, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET } = auth;

const app = express();

app.get('/', (req, res) => {
  res.status(200).send({ msg: 'Please go to /login' });
});

app.get('/login', (req, res) => {
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      queryStringify.stringify({
        response_type: 'code',
        client_id: SPOTIFY_CLIENT_ID,
        scope: 'user-read-private user-read-email',
        redirect_uri
      })
  );
});

app.get('/callback', (req, res) => {
  let code = req.query.code || null;
  let authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      Authorization:
        'Basic ' +
        new Buffer(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET).toString(
          'base64'
        )
    },
    json: true
  };
  request.post(authOptions, (error, response, body) => {
    var access_token = body.access_token;
    let uri = process.env.FRONTEND_URI || 'http://localhost:3000';
    res.redirect(uri + '?access_token=' + access_token);
  });
});

module.exports = app;
