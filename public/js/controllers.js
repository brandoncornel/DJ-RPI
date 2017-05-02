angular.module('spotifyDJApp.controllers',[])
    .controller('Splash', ['$scope', '$routeParams', 'UserFactory', function($scope, $routeParams, UserFactory) {
        if ($routeParams.accessToken && $routeParams.refreshToken) {
            UserFactory.setTokensAndPullUserInfo($routeParams.accessToken, $routeParams.refreshToken);
        }
        $scope.userFactory = UserFactory;
    }])
    .controller('User', ['$scope', 'UserFactory', function($scope, UserFactory) {

        $scope.username = "NaN";

        var currentUser = UserFactory.currentUser();

        $scope.userLoggedIn = function(){
            if(UserFactory.userLoggedIn()){
                if(UserFactory.currentUser().data.display_name==null){
                    $scope.username = currentUser.data.email;
                }else{
                    $scope.username = currentUser.data.display_name;
                }
                return true;
            }
            return false;
        }


    }])
    .controller('UsersLogOut', ['$scope', '$location', 'UserFactory', function($scope, $location, UserFactory, RedditUserFactory) {
        UserFactory.clearUserData();
        RedditUserFactory.clearUserData();
        $location.path('#/splash')
    }]);


