angular.module('spotifyDJApp.controllers',[])
    .controller('Splash', ['$scope', '$routeParams', 'UserFactory', function($scope, $routeParams, UserFactory) {
        console.log("HERE FIRST");
        if ($routeParams.accessToken && $routeParams.refreshToken) {
            console.log("HERE");
            console.log($routeParams.accessToken)
            UserFactory.setTokensAndPullUserInfo($routeParams.accessToken, $routeParams.refreshToken);
        }
        $scope.userFactory = UserFactory;
    }])
    .controller('User', ['$scope', 'UserFactory', function($scope, UserFactory) {
        console.log("USER HERE");
        $scope.userFactory = UserFactory;
    }])
    .controller('UsersLogOut', ['$scope', '$location', 'UserFactory', function($scope, $location, UserFactory, RedditUserFactory) {
        UserFactory.clearUserData();
        RedditUserFactory.clearUserData();
        $location.path('#/splash')
    }]);


