angular.module('spotifyDJApp.services', [])
	.factory('UserFactory', function($http, $rootScope){
		return {
			currentUser: function() {
				return JSON.parse(window.localStorage.getItem('currentUser'));
			},
			setCurrentUser: function(userJson) {
				window.localStorage.setItem('currentUser', JSON.stringify(userJson));
			},
			getUserId: function() {
				var user = this.currentUser();
				return user.id;
			},
			userLoggedIn: function() {
				return this.currentUser() !== null && this.currentUser() !== undefined && this.currentUser() != "null";
			},
			getAccessToken: function() {
				return window.localStorage.getItem('access_token');
			},
			setAccessToken: function(accessToken) {
				window.localStorage.setItem('access_token', accessToken);
			},
			getRefreshToken: function() {
				return window.localStorage.getItem('refresh_token');
			},
			setRefreshToken: function(refreshToken) {
				window.localStorage.setItem('refresh_token', refreshToken);
			},
			getNewAccessToken: function(successCallback, errorCallback) {
				$http.get('/refresh_token?refresh_token=' + this.getRefreshToken()).success(successCallback).error(errorCallback);
			},
			getSpotifyUserInfo: function() {
				var _this = this;
				$http.defaults.headers.common.Authorization = 'Bearer ' + this.getAccessToken();
				$http.get('https://api.spotify.com/v1/me').then(function(response) {
					// Update the stored data
					_this.setCurrentUser(response);
				});
			},
			clearUserData: function() {
				window.localStorage.removeItem('currentUser');
				window.localStorage.removeItem('access_token');
				window.localStorage.removeItem('refresh_token');
			},
			setTokensAndPullUserInfo: function(accessToken, refreshToken) {
				this.setAccessToken(accessToken);
				this.setRefreshToken(refreshToken);
				this.getSpotifyUserInfo();
			},
		}
	});

