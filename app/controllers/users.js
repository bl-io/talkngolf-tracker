'use strict';

angular.module('TnG')

.controller('UsersLogin', function ($scope, $location, $q, $rootScope, $window, $firebase, FirebaseAuth) {
	var quickRegister = {};

	$scope.quickRegister = quickRegister;

	$scope.login = function () {
		FirebaseAuth.simplelogin;
	};

	$scope.loginWithTwitter = function () {
		FirebaseAuth.authTwitter();
	};

	$scope.loginWithFacebook = function () {
		FirebaseAuth.authFacebook;
	};


	$scope.loginWithPassword = function () {
		var email = $scope.quickRegister.username;
		var password = $scope.quickRegister.password;

		if(email && password) {
			FirebaseAuth.authPassword(email, password);
		}

	}

	$scope.quickStart = function () {
		FirebaseAuth.quickStart($scope);
	};

})

.controller('UsersLogout', function ($scope, FirebaseAuth) {
		FirebaseAuth.logout();
})

