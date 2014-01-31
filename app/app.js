angular.module('TnG', ['ngRoute', 'firebase'])
.run(function ($rootScope, $location) {

})
.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            controller:'Chooser',
	          template: "loading...",
	          resolve: {
		          dependencies: function ($q, $rootScope, $window) {
			          var userRef = new Firebase('https://talkngolf.firebaseio.com');
			          var auth = new FirebaseSimpleLogin(userRef, function(error, user) {
				          if (error) {
					          // an error occurred while attempting login
					          console.log(error);

				          } else if (user) {
					          // user authenticated with Firebase
					          console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
										$rootScope.loggedInAs = user.id;
					          $window.location = "#/play"

				          } else {
					          // user is logged out
					          $window.location = "#/login";

				          }

			          });
		          }
	          }
        })
        .when('/play', {
            controller:'Chooser',
            templateUrl:'app/views/chooser.angv'
        })
        .when('/register', {
            controller:'Users',
            templateUrl:'app/views/users_register.angv'
        })
        .when('/login', {
            controller:'UsersLogin',
            templateUrl:'app/views/users_login.angv'
        })
        .when('/logout', {
            controller:'UsersLogout',
            templateUrl:'app/views/users_logout.angv',
				    resolve: {
					    dependencies: function ($q, $rootScope) {
						    var userRef = new Firebase('https://talkngolf.firebaseio.com');
						    var auth = new FirebaseSimpleLogin(userRef, function () {});
						    auth.logout();

					    }
				    }
        })
});