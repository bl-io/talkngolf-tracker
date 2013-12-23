angular.module('TnG')

.config(function ($routeProvider) {
    $routeProvider

        .when('/play/choose/clubset', {
            controller:'Clubset',
            templateUrl:'app/views/choose_clubset.angv'
        })

        .when('/play/choose/course', {
            controller:'Course',
            templateUrl:'app/views/choose_course.angv'
        })

        .when('/play/choose/course/start', {
            controller:'CourseStart',
            templateUrl:'app/views/choose_course_starting_hole.angv'
        })
});