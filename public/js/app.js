angular.module('spotifyDJApp', [
	'ngRoute',
	'spotifyDJApp.controllers',
	'spotifyDJApp.services'
	])

	.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
		$locationProvider.hashPrefix('');
		$routeProvider.when('/splash/:accessToken/:refreshToken', {
			templateUrl: 'partials/splash.html',
			controller: 'Splash'
		});
		$routeProvider.when('/splash/', {
    		templateUrl: 'partials/splash.html',
    		controller: 'Search'
  		});
  		$routeProvider.when('/search/textbox/:accessToken/:refreshToken', {
  			templateUrl: 'partials/textbox.html',
  			controller: 'Textbox'
  		});
  		$routeProvider.when('/logout', {
  			templateUrl: 'partials/splash.html',
    		controller: 'UsersLogOut'
  		});
		$routeProvider.otherwise({redirectTo: '/splash'});

}]);

