angular.module('TnG')

.service('PlayTracking', function ($http, $location, $route, $routeParams) {
        this.mulliganLog = [];
        this.endpoint = "https://talkngolf.firebaseio.com/";

        this.fetch = function (collection, callback) {

            $http({method: 'GET', url: this.endpoint + collection +'.json'})

            .success(function(fetchedData) {
                callback(fetchedData);
            })

            .error(function(error, status) {
                callback(error, status);
            });
        };

        this.continue = function (nextStep) {
            console.log('continue');
            if(nextStep) {
                $location.path(nextStep);
            }
        };

        this.mulligan = function () {
            var dataToSave = {}, currentHole, currentShot, selectedClub, moodSwing, nextStep, params;
            params = $routeParams;

            this.mulliganLog.push(params);

            var doOverLocation = $location.path().split('/');
            doOverLocation.pop(); //remove the moodSwing
            doOverLocation.pop(); //remove the club selection

            nextStep = doOverLocation.join('/');

            this.continue(nextStep);
            console.log('mulligan shot');
        };

        this.editTracking = function () {
            console.log('edit hole');
        };

        this.nextHole = function () {
            console.log('next hole');
        };

        this.nextShot = function () {
            console.log('next shot');
        };
})