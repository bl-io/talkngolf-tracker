angular.module('TnG')

    .controller('Chooser', function ($scope, PlaySetup) {
        var nextStep = "/play/choose/clubset";
        $scope.heading = "Choose";
        $scope.subHeading = "Starting hole";
        $scope.panes = {
            "Practice": "practice",
            "Play": "play"
        };

        $scope.continuePlaySetup = function (selectedMode) {
            PlaySetup.selectedMode = selectedMode;
            PlaySetup.continuePlaySetup(nextStep);
        };
    })

    .controller('Clubset', function ($scope, PlaySetup) {
        var baseCollection = collection = 'clubs';
        var nextStep = "/play/choose/course";
        $scope.heading = "Choose Club Set";
        $scope.subHeading = "Available sets"

        PlaySetup.getPanes(collection, function (availableClubSets) {
            $scope.panes = availableClubSets;
        });

        $scope.continuePlaySetup = function (selectedClubSet) {
            PlaySetup.selectedClubSet = $scope.panes[selectedClubSet];

            collection = baseCollection + "/" + selectedClubSet;
            PlaySetup.continuePlaySetup(nextStep);
        };
    })

    .controller('Course', function ($scope, PlaySetup) {
        var collection = "courses";
        var nextStep = "/play/choose/course/start";

        $scope.heading = "Choose Golf Course";
        $scope.subHeading = "Your Favorite Courses";

        PlaySetup.getPanes(collection, function (retrievedCourse) {
            $scope.panes = retrievedCourse;
        });

        $scope.continuePlaySetup = function (selectedCourse) {
            PlaySetup.selectedCourse = selectedCourse;
            PlaySetup.continuePlaySetup(nextStep);
        };
    })

    .controller('CourseStart', function ($scope, PlaySetup) {
        var nextStep = "/play/track/";

        $scope.heading = "Choose";
        $scope.subHeading = "The Starting Hole";

        $scope.panes = {
            "1": "1",
            "10": "10"
        };

        $scope.continuePlaySetup = function (selectedStartingHole) {
            PlaySetup.selectedStartingHole = selectedStartingHole;
            PlaySetup.continuePlaySetup(nextStep + selectedStartingHole);
        };
    })