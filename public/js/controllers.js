angular.module('spotifyDJApp.controllers',[])
    .controller('Splash', ['$scope', '$routeParams', '$window', '$rootScope' , 'UserFactory', function($scope, $routeParams, $window, $rootScope, UserFactory) {

        $scope.username = "NaN";
        $scope.loggedIn = UserFactory.userLoggedIn();
        var currentUser;
        if($scope.loggedIn){
            currentUser = UserFactory.currentUser();

        }else{
            currentUser = null;
        }

        $scope.$on('$routeChangeSuccess', function() {
        if ($routeParams.accessToken && $routeParams.refreshToken) {
            UserFactory.setTokensAndPullUserInfo($routeParams.accessToken, $routeParams.refreshToken, function(data){
            $scope.loggedIn = UserFactory.userLoggedIn();
            if($scope.loggedIn){
                currentUser = UserFactory.currentUser();
                $scope.$apply(function(){
                    $scope.username = currentUser.email;
                    console.log($scope.username);
                })

        }
            });  
        }
            // $routeParams should be populated here
        });
        if($scope.loggedIn){
                $scope.username = currentUser.email;
        }
    }])

    .controller('User', ['$scope', '$rootScope', 'UserFactory', function($scope, $rootScope, UserFactory) {

        $scope.username = "NaN";

        var currentUser = UserFactory.currentUser();
        $scope.loggedIn = UserFactory.userLoggedIn();

        $rootScope.$on("CallUserUserLoggedIn", function(){
           $scope.userLoggedIn();
        });
       

        $scope.userLoggedIn = function(){
         
        }

         


    }])
    .controller('UsersLogOut', ['$scope', '$location', 'UserFactory', function($scope, $location, UserFactory, RedditUserFactory) {
        UserFactory.clearUserData();
        RedditUserFactory.clearUserData();
        $location.path('#/splash')
    }]);


