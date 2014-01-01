var app = angular.module('TnG', ['ngRoute', 'firebase'])
    .config(function ($routeProvider) {

        $routeProvider
            .when('/', {
                controller:'Chooser',
                templateUrl:'app/views/chooser.angv'
            })
    })

