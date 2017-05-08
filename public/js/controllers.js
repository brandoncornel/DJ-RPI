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
                console.log($scope.username);
                $window.location.href = '/';

        }
            });  
        }
            $scope.username = "NaN";
        $scope.loggedIn = UserFactory.userLoggedIn();
        if($scope.loggedIn){
            currentUser = UserFactory.currentUser();
            $scope.username = currentUser.email;
            console.log($scope.username);

        }else{
            currentUser = null;
        }
        console.log($scope.loggedIn);

        });
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
        console.log("Logging Out");
        $location.path('#/splash')
    }]);


