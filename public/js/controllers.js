angular.module('spotifyDJApp.controllers',[])
    .controller('Splash', ['$scope', '$routeParams', 'UserFactory', function($scope, $routeParams, UserFactory) {
        console.log($routeParams);
        if ($routeParams.accessToken && $routeParams.refreshToken) {
            UserFactory.setTokensAndPullUserInfo($routeParams.accessToken, $routeParams.refreshToken);
        }
        $scope.userFactory = UserFactory;
    }])
    .controller('User', ['$scope', 'UserFactory', function($scope, UserFactory) {
        $scope.userFactory = UserFactory;
    }])
    .controller('UsersLogOut', ['$scope', '$location', 'UserFactory', function($scope, $location, UserFactory, RedditUserFactory) {
        UserFactory.clearUserData();
        RedditUserFactory.clearUserData();
        $location.path('#/splash')
    }]);


