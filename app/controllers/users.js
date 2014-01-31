'use strict';

angular.module('TnG')

.controller('UsersLogin', function ($scope, $location, $q, $rootScope, $window, $firebase, FirebaseAuth) {
	var quickRegister = {};

	$scope.login = FirebaseAuth.simplelogin;
	$scope.loginWithTwitter = FirebaseAuth.authTwitter;
	$scope.loginWithFacebook = FirebaseAuth.authFacebook;
	$scope.quickRegister = quickRegister;
	$scope.quickStart = FirebaseAuth.quickStart;

})

.controller('UsersLogout', function ($scope, FirebaseAuth) {
		FirebaseAuth.logout();
})

