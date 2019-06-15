# Label Search

This repo conains the backend for Label Search, an app that uses [Spotify](https://www.spotify.com/)'s API to search for music based on record label.

The frontend for the project can be viewed [here](https://github.com/rhydiandav/label-search).

_Please Note_: This app requires you to log in using a valid Spotify account.

## View The App

Please click [here](https://label-search.herokuapp.com) to view the live app, hosted on [Heroku](https://www.heroku.com/).

Click [here](https://label-search-backend.herokuapp.com) to view the hosted backend server.

## Run Locally

To install this app, please run the following commands:

- `git clone https://github.com/rhydiandav/label-search-backend.git`
- `cd label-search-backend`
- `npm install`

Before running, you will need to register a Spotfy Application. To do this, click [here](https://developer.spotify.com/my-applications) and follow the instructions.

Wheny you have registered the application, you will need to add `http://localhost:8888` as a callback URL under the application settings.

When this is ready, you can use the _Client ID_ and _Client Secret_ to run the app.

Create a new file in the `label-search-backend` directory called `auth.js`.

In this file, enter the following, inserting your application's Client ID and Client Secret where relevant:

```js
const auth = {
  redirect_uri: 'http://localhost:8888/callback',
  SPOTIFY_CLIENT_ID: 'Your Client ID Here',
  SPOTIFY_CLIENT_SECRET: 'Your Client Secret Here'
};

module.exports = auth;
```

**NOTE**: Please ensure your Client Secret is kept private at all times. If you suspect that this has been compromised, you can reset the Client Secret in the Spotify Application Dashboard.

With the `auth.js` file ready, you can now run the server by entering the command `npm start`.

## Technologies Used

- [Node.JS](https://nodejs.org/)
- [Express](https://expressjs.com/)
