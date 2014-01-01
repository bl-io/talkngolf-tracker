angular.module('TnG')

    .controller('Chooser', function ($scope, PlaySetup, $firebase) {
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

    .controller('Clubset', function ($scope, $firebase, PlaySetup) {
        var baseCollection = collection = 'clubs';
        var nextStep = "/play/choose/course"

        $scope.heading = "Choose Club Set";
        $scope.subHeading = "Available sets"

        //@TODO: Service replacment - AngularFire
        var defaultClubsRefUrl = 'https://talkngolf.firebaseio.com/clubs';
        var defaultClubsRef = new Firebase(defaultClubsRefUrl);

        $scope.panes = $firebase(defaultClubsRef);


        $scope.continuePlaySetup = function (selectedClubSet) {
            PlaySetup.selectedClubSet = $scope.panes[selectedClubSet];

            collection = baseCollection + "/" + selectedClubSet;
            PlaySetup.continuePlaySetup(nextStep, $scope.panes[selectedClubSet], 'clubs')
        };
    })

    .controller('Course', function ($scope, $firebase, PlaySetup) {
        var collection = "courses";
        var nextStep = "/play/choose/course/start";

        $scope.heading = "Choose Golf Course";
        $scope.subHeading = "Your Favorite Courses";

        //@TODO: Service replacment - AngularFire
        var coursesRefUrl = 'https://tng-courses.firebaseio.com';
        var coursesRef = new Firebase(coursesRefUrl);

        $scope.panes = $firebase(coursesRef);


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