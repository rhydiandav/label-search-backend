const express = require('express');
const ENV = process.env.NODE_ENV || 'development';

const auth =
  ENV === 'production'
    ? {
        REDIRECT_URI: process.env.REDIRECT_URI,
        SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
        SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET
      }
    : require('./connection');

console.log(auth);

const app = express();
