var app = angular.module('TnG', ['ngRoute', 'firebase'])
    .config(function ($routeProvider) {

        $routeProvider
            .when('/', {
                controller:'Chooser',
                templateUrl:'app/views/chooser.angv'
            })
    })

    .controller('TrackClub', function ($scope, $firebase, $http, $location, PlaySetup, PlayTracking, $routeParams) {
        var baseUrl, nextStep, hole, shot, clubSet, round;

        round = $routeParams;
        baseUrl = $location.path() + "/";

        $scope.heading = "Track Club";
        $scope.subHeading = "Hole " + round.currentHole + " Shot "+ round.currentShot;


        $scope.selectClub = function (selectedClub) {
            selectedClub = selectedClub.code;
            nextStep = baseUrl + selectedClub;

            PlayTracking.continue(nextStep);
        };
    })

    .controller('TrackMood', function ($scope, PlayTracking, $location, $routeParams) {
        var baseUrl, nextStep, round;

        baseUrl = $location.path() + "/";
        round = $routeParams;

        $scope.heading = "How did that feel?";
        $scope.subHeading = "Hole " + round.currentHole + " > Shot "+ round.currentShot + " > " + round.selectedClub;

        $scope.panes = {
            "1": "face face1",
            "2": "face face2",
            "3": "face face3",
            "4": "face face4"
        };

        $scope.selectMood = function (selectedMood) {
            selectedMood = selectedMood;
            nextStep = baseUrl + selectedMood;

            PlayTracking.saveShot().then(function () {
                PlayTracking.continue(nextStep);
            });

        };
    })

    .controller('TrackWhatsNext', function ($scope, PlayTracking, $routeParams) {
        $scope.heading = "What's Next?";

        $scope.selectNext = function (selectedNextAction) {
            if(PlayTracking[selectedNextAction]) {
                PlayTracking[selectedNextAction]();
            }
        }
    })