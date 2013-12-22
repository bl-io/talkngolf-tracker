var app = angular.module('TnG', ['ngRoute'])

    .value('endpoint', 'https://talkngolf.firebaseio.com')

    .factory('Talkngolf', function ($firebase, endpoint) {
        return $firebase(new Firebase(endpoint));
    })

    .config(function ($routeProvider) {
        $routeProvider
            .when('/choose', {
                controller:'Chooser',
                templateUrl:'app/views/chooser.angv'
            })
    })

    .controller('Chooser', function ($scope) {
        $scope.heading = "Choose";
        $scope.subHeading = "Starting hole";
        $scope.panes = {
                "Practice": "/practice",
                "Play": "/play/choose/clubset"
            }
    });