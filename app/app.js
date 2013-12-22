var app = angular.module('TnG', ['ngRoute'])

    .value('endpoint', 'https://talkngolf.firebaseio.com')

    .config(function ($routeProvider) {
        $routeProvider

            .when('/', {
                controller:'Chooser',
                templateUrl:'app/views/chooser.angv'
            })

            .when('/play/choose/clubset', {
                controller:'Clubset',
                templateUrl:'app/views/choose_clubset.angv'
            })

            .when('/play/choose/course', {
                controller:'Course',
                templateUrl:'app/views/choose_course.angv'
            })
    })

    .service('PlaySetup', function ($http, $location) {
        var endpoint = "https://talkngolf.firebaseio.com/";

        this.getPanes = function (collection, callback) {
            $http({method: 'GET', url: endpoint + collection + '/.json'})
                .success(function (data, status, headers, config) {
                    callback(data);
                })
        };

        this.continuePlaySetup = function (nextStep, dataToSave) {
            $location.path(nextStep);
        };
    })

    .controller('Round', function ($scope) {
        $scope.$on('round-update', function() {
            alert('round updated');
        });
    })

    .controller('Chooser', function ($scope, PlaySetup) {
        $scope.continuePlaySetup = function (nextStep) {
            PlaySetup.continuePlaySetup(nextStep);
        }
        $scope.heading = "Choose";
        $scope.subHeading = "Starting hole";
        $scope.panes = {
                "Practice": "#",
                "Play": "/play/choose/clubset"
            }
    })

    .controller('Clubset', function ($scope, PlaySetup) {
        var baseCollection = collection = 'clubs';

        $scope.continuePlaySetup = function (clubData) {
            collection = baseCollection + "/" + clubData;
        };

        $scope.heading = "Choose Club Set";
        PlaySetup.getPanes(collection, function (retrievedClubset) {
            $scope.panes = retrievedClubset;
        });
    })

    .controller('Course', function ($scope, PlaySetup) {
        $scope.continuePlaySetup = function (nextStep) {
            PlaySetup.continuePlaySetup(nextStep);
        }
        $scope.heading = "Choose Club Set";
        $scope.panes = {}
    })