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

    .controller('TrackClub', function ($scope, PlaySetup, PlayTracking, $routeParams) {
        var nextStep, currentHole, currentShot, myClubs;

        $scope.heading = "Pick A Club";
        currentHole = $routeParams.currentHole;
        currentShot = $routeParams.currentShot;
        myClubs = PlaySetup.selectedClubSet || {"driver": "driver"}

        $scope.subHeading = "Hole " + currentHole + " Shot " + currentShot;
        $scope.panes = myClubs;

        $scope.trackShot = function (clubUsed) {
            PlayTracking.trackShot(currentHole, currentShot, clubUsed);
            nextStep = "/play/track/"+currentHole+"/"+currentShot+"/"+clubUsed.code;
            PlayTracking.continue(nextStep);
        };
    })

    .controller('TrackMood', function ($scope, PlayTracking, $routeParams) {
        var baseUrl = "/play/track",
            nextStep, shotData;
        $scope.heading = "How did that feel?";
        $scope.subHeading = "Track Your MoodSwing";

        $scope.panes = {
            "4": "face face4",
            "3": "face face3",
            "2": "face face2",
            "1": "face face1"
        };

        $scope.trackMood = function (moodSwing) {
            nextStep = baseUrl;

            for(var page in $routeParams) {
                nextStep += "/" + $routeParams[page] + "/" + moodSwing;;
            }

            shotData = {
                "holeNumber": $routeParams.currentHole,
                "shotNumber": $routeParams.currentShot,
                "clubUsed": $routeParams.selectedClub
            };

            PlayTracking.trackMood(moodSwing);

//            console.log(nextStep)
//            PlayTracking.continue(nextStep);
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
                "label": "Edit",
                "name": "edit"
            },
            {
                "listOrder": "1",
                "label": "Next Hole",
                "name": "next_hole"
            },
            {
                "listOrder": "1",
                "label": "Continue",
                "name": "continue"
            }
        ];

//        $scope.continue = function (nextActionLink) {
//            nextStep = "/";
//
//        };
    })