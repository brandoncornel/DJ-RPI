var express = require('express'); // Express web server framework
var request = require('request'); // "Request" library
var querystring = require('querystring');
//============================
var client_id = '87086a6a07dc41da83e5889bf50a4216'; // Your client id
var client_secret = 'ebe276d8597c46679bf1f2886cef4d7f'; // Your secret
var redirect_uri = 'http://localhost:3000/callback'; // Your redirect uri

var generateRandomString = function(length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var stateKey = 'spotify_auth_state';



module.exports = function(app) {

	app.get('/callback', function(req, res) {

	  // your application requests refresh and access tokens
	  var code = req.query.code;
	  var authOptions = {
	    url: 'https://accounts.spotify.com/api/token',
	    form: {
	      code: code,
	      redirect_uri: redirect_uri,
	      grant_type: 'authorization_code',
	      client_id: client_id,
	      client_secret: client_secret
	    },
	    json: true
	  };

	  request.post(authOptions, function(error, response, body) {
	    if (!error && response.statusCode === 200) {

	      var access_token = body.access_token,
	          refresh_token = body.refresh_token;

	      var options = {
	        url: 'https://api.spotify.com/v1/me',
	        headers: { 'Authorization': 'Bearer ' + access_token },
	        json: true
	      };

	      // use the access token to access the Spotify Web API
	      request.get(options, function(error, response, body) {
	        console.log(body);
	      });

	      // we can also pass the tokens to the browser to make requests from there
	      console.log('/splash/' + access_token + '/' + refresh_token);
	      res.redirect('/splash/' + access_token + '/' + refresh_token);
	    }
	  });
	});

	app.get('/refresh_token', function(req, res) {

	  // requesting access token from refresh token
	  var refresh_token = req.query.refresh_token;
	  var authOptions = {
	    url: 'https://accounts.spotify.com/api/token',
	    headers: { 'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')) },
	    form: {
	      grant_type: 'refresh_token',
	      refresh_token: refresh_token
	    },
	    json: true
	  };

	  request.post(authOptions, function(error, response, body) {
	    if (!error && response.statusCode === 200) {
	      var access_token = body.access_token;
	      res.send({
	        'access_token': access_token
	      });
	    }
	  });
	});

	app.get('/login', function(req, res) {

	  var state = generateRandomString(16);
	  res.cookie(stateKey, state);

	  // your application requests authorization
	  var scope = 'user-read-private user-read-email';
	  res.redirect('https://accounts.spotify.com/authorize?' +
	    querystring.stringify({
	      response_type: 'code',
	      client_id: client_id,
	      scope: scope,
	      redirect_uri: redirect_uri,
	      state: state
	    }));
	});
};