angular.module('spotifyDJApp.controllers',[])
    .controller('Splash', ['$scope', '$routeParams', '$window', '$rootScope' , 'UserFactory', function($scope, $routeParams, $window, $rootScope, UserFactory) {
        var currentUser;
        $scope.$on('$routeChangeSuccess', function() {
        if ($routeParams.accessToken && $routeParams.refreshToken) {
            UserFactory.setTokensAndPullUserInfo($routeParams.accessToken, $routeParams.refreshToken, function(data){
            $scope.loggedIn = UserFactory.userLoggedIn();
            if($scope.loggedIn){
                currentUser = UserFactory.currentUser();
                $scope.username = currentUser.email;
                $window.location.href = '/';

        }
            });  
        }
        $scope.username = "NaN";
        $scope.loggedIn = UserFactory.userLoggedIn();
        if($scope.loggedIn){
            currentUser = UserFactory.currentUser();
            $scope.username = currentUser.email;

        }else{
            currentUser = null;
        }
        });
    }])

    .controller('Search', ['$scope', '$rootScope', 'UserFactory', 'SearchFactory', function($scope, $rootScope, UserFactory, SearchFactory) {
        var currentUser;
        $scope.loggedIn = UserFactory.userLoggedIn();
        if($scope.loggedIn){
            currentUser = UserFactory.currentUser();
            $scope.username = currentUser.email;

        }else{
            currentUser = null;
        }  
        $scope.searchData = "";

        $scope.searchForSong = function(){
            SearchFactory.search(this.searchData);
            this.searchData="";

        }


    }])
    .controller('UsersLogOut', ['$scope', '$location', 'UserFactory', function($scope, $location, UserFactory) {
        UserFactory.clearUserData();
        console.log("Logging Out");
        $location.path('#/splash')
    }]);


