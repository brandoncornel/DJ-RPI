angular.module('spotifyDJApp.services', [])
	.factory('UserFactory', function($http, $rootScope, $q){
		return {
			currentUser: function() {
				return JSON.parse(window.localStorage.getItem('currentUser'));
			},
			setCurrentUser: function(userJson) {
				window.localStorage.setItem('currentUser', JSON.stringify(userJson));
				return $q.all(true);
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
				return $q.all(true);
			},
			getRefreshToken: function() {
				return window.localStorage.getItem('refresh_token');
			},
			setRefreshToken: function(refreshToken) {
				window.localStorage.setItem('refresh_token', refreshToken);
				return $q.all(true);
			},
			getNewAccessToken: function(successCallback, errorCallback) {
				$http.get('/refresh_token?refresh_token=' + this.getRefreshToken()).success(successCallback).error(errorCallback);
			},
			getSpotifyUserInfo: function() {
				
				return $q.all(true);
			},
			clearUserData: function() {
				window.localStorage.removeItem('currentUser');
				window.localStorage.removeItem('access_token');
				window.localStorage.removeItem('refresh_token');
			},
			setTokensAndPullUserInfo: function(accessToken, refreshToken, callback) {
				this.setAccessToken(accessToken).then(this.setRefreshToken(refreshToken));
				var access_token = this.getAccessToken();
				var _this = this;
				$.ajax({
                url: 'https://api.spotify.com/v1/me',
                headers: {
                  'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                  _this.setCurrentUser(response);
                  callback({response: response});
                }
            	});

			}
		}
	});

