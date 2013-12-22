/*
angular.module('TnG', ['ngRoute', 'firebase'])

    .value('endpoint', 'https://talkngolf.firebaseio.com')

    .factory('Talkngolf', function ($firebase, endpoint) {
        return $firebase(new Firebase(endpoint));
    })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/play/choose', {
                controller:'Chooser',
                templateUrl:'app/views/chooser.angv'
            })
    })

    .controller('Chooser', function ($scope) {
        $scope.title = "Chooser";
    });
*/

var app = angular.module('TnG', ['ngRoute']);

app.controller('Chooser', function ($scope) {
    $scope.heading = "Choose";
    $scope.subHeading = "Starting hole";
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            controller:'Chooser',
            templateUrl:'app/views/chooser.angv'
        })
})