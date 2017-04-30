angular.module('spotifyDJApp', [
	'ngRoute',
	'spotifyDJApp.controllers',
	'spotifyDJApp.services'
	])

	.config(['$routeProvider', function($routeProvider) {
		$routeProvider.when('/splash/:accessToken/:refreshToken', {
			templateUrl: 'partials/splash.html',
			controller: 'Splash'
		});
		$routeProvider.when('/splash/', {
    		templateUrl: 'partials/splash.html',
    		controller: 'Splash'
  		});
		$routeProvider.otherwise({redirectTo: '/splash'});

}]);

