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
        var baseCollection = collection = 'clubs',
            nextStep = "/play/choose/course",
            availableSets;

        $scope.heading = "Choose Club Set";
        $scope.subHeading = "Available sets"


        PlaySetup.getPageData(collection, function (availableClubSets) {
            $scope.panes = availableSets = availableClubSets;
        });

        $scope.continuePlaySetup = function (selectedClubSet) {
            PlaySetup.selectedClubSet = $scope.panes[selectedClubSet];

            collection = baseCollection + "/" + selectedClubSet;
            PlaySetup.continuePlaySetup(nextStep, availableSets[selectedClubSet], 'clubs')
        };
    })

    .controller('Course', function ($scope, PlaySetup) {
        var collection = "courses";
        var nextStep = "/play/choose/course/start";

        $scope.heading = "Choose Golf Course";
        $scope.subHeading = "Your Favorite Courses";

        PlaySetup.getPageData(collection, function (retrievedCourse) {
            $scope.panes = retrievedCourse;
        });

        $scope.continuePlaySetup = function (selectedCourse) {
            PlaySetup.selectedCourse = selectedCourse;
            PlaySetup.continuePlaySetup(nextStep, selectedCourse, 'course');
        };
    })

    .controller('CourseStart', function ($scope, PlaySetup) {
        var nextStep = "/play/track/",
            startingHoles = {
                "1": "1",
                "10": "10"
            };

        $scope.heading = "Choose";
        $scope.subHeading = "The Starting Hole";

        $scope.panes = startingHoles;

        $scope.continuePlaySetup = function (selectedStartingHole) {
            PlaySetup.selectedStartingHole = selectedStartingHole;
            PlaySetup.continuePlaySetup(
                nextStep + selectedStartingHole,
                startingHoles[selectedStartingHole],
                'startingHole');
        };
    })