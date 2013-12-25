var app = angular.module('TnG', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider

            .when('/', {
                controller:'Chooser',
                templateUrl:'app/views/chooser.angv'
            })

            .when('/mockup', {
                templateUrl:'app/views/mockup.angv'
            })

            .when('/play/track/:currentHole', {
                redirectTo: "/play/track/:currentHole/1"
            })

            .when('/play/track/:currentHole/:currentShot', {
                controller:'TrackClub',
                templateUrl:'app/views/tracking_club.angv'
            })

            .when('/play/track/:currentHole/:currentShot/:selectedClub', {
                controller:'TrackMood',
                templateUrl:'app/views/tracking_mood.angv'
            })

            .when('/play/track/:currentHole/:currentShot/:selectedClub/:moodSwing', {
                controller:'TrackWhatsNext',
                templateUrl:'app/views/tracking_whats_next.angv'
            })

    })

    .controller('TrackClub', function ($scope, $http, $location, PlaySetup, PlayTracking, $routeParams) {
        var baseUrl, nextStep, hole, shot, clubSet, round;

        round = $routeParams;
        baseUrl = $location.path() + "/";

        $scope.heading = "Track Club";
        $scope.subHeading = "Hole " + round.currentHole + " Shot "+ round.currentShot;
        $scope.panes = PlaySetup.selectedClubSet;

        $scope.selectClub = function (selectedClub) {
            selectedClub = selectedClub.code;
            nextStep = baseUrl + selectedClub;

            PlayTracking.continue(nextStep);
        };

//        PlayTracking.fetch('clubs', function (publicClubSets) {
//            $scope.panes = publicClubSets;
//            console.log(PlaySetup)
//        })
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

            PlayTracking.continue(nextStep);
        };
    })

    .controller('TrackWhatsNext', function ($scope, PlayTracking, $routeParams) {
        $scope.heading = "What's Next?";

        $scope.panes = [
            {
                "listOrder": "1",
                "label": "Mulligan",
                "name": "mulligan"
            },
            {
                "listOrder": "2",
                "label": "Edit Hole",
                "name": "editHole"
            },
            {
                "listOrder": "3",
                "label": "Edit Shot",
                "name": "editShot"
            },
            {
                "listOrder": "4",
                "label": "Next Hole",
                "name": "nextHole"
            },
            {
                "listOrder": "5",
                "label": "Continue",
                "name": "nextShot"
            }
        ];

        $scope.selectNext = function (selectedNextAction) {
            if(PlayTracking[selectedNextAction]) {
                PlayTracking[selectedNextAction]();
            }
        }
    })