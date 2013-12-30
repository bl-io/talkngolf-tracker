'use strict'

//@TODO: Replace with loggedInAs when Auth is integrated
var username = "dwayneford";

angular.module('TnG')

.service('PlayTracking', function ($http, $location, $q, $route, $routeParams) {
        this.mulliganLog = [],
        this.shotLog = {};
        this.endpoint = "https://talkngolf.firebaseio.com/";
        this.roundEndpoint = "https://tng-rounds.firebaseio.com/" + username;

        this._formatPathData = function () {
            var params = $routeParams,
                dataToSave = {};

            for (var paramName in params) {
                if (paramName == "selectedClub" || paramName == "moodSwing" || paramName == "currentHole") {
                    dataToSave[paramName] = params[paramName];
                }
            }
            dataToSave.time = Date();

            return dataToSave;
        };

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

        this.saveToMulliganLog = function (dataToSave) {
            this.mulliganLog.push(dataToSave);
        }

        this.mulligan = function () {
            var dataToSave = {}, currentHole, currentShot, selectedClub, moodSwing, nextStep, params;
            params = $routeParams;

            for(var paramName in params) {
                dataToSave[paramName] = params[paramName];
            }

            this.saveToMulliganLog(dataToSave);

            console.log(this.mulliganLog);

            var doOverLocation = $location.path().split('/');

            doOverLocation.pop(); //remove the moodSwing
            doOverLocation.pop(); //remove the club selection

            nextStep = doOverLocation.join('/');
            console.log('mulligan shot');
            this.continue(nextStep);
        };

        this.editTracking = function () {
            console.log('edit hole');
        };

        this.nextHole = function () {
            var baseUrl,
                currentHoleAsNumber,
                nextHoleAsNumber,
                nextStep,
                params = $routeParams;

            currentHoleAsNumber = parseInt(params.currentHole);

            nextHoleAsNumber = currentHoleAsNumber + 1;

            baseUrl = $location.path().split('/');
            baseUrl.pop();
            baseUrl.pop();
            baseUrl.pop();
            baseUrl.pop();

            nextStep = baseUrl.join('/') + "/" + nextHoleAsNumber;
            this.continue(nextStep);
        };

        this.nextShot = function () {
            var params = $routeParams,
                baseUrl,
                currentShotAsNumber,
                newParams = [],
                nextShotAsNumber,
                nextStep,
                dataToSave = this._formatPathData();

            if(!this.shotLog[params.currentHole]) {
                this.shotLog[params.currentHole] = [];
            };

            this.shotLog[params.currentHole].push(dataToSave);

            $http.put(this.roundEndpoint + "/.json", this.shotLog);

            currentShotAsNumber = parseInt(params.currentShot);

            nextShotAsNumber = currentShotAsNumber + 1;

            params.currentShot = nextShotAsNumber.toString();

            baseUrl = $location.path().split('/');
            baseUrl.pop();
            baseUrl.pop();
            baseUrl.pop();
            baseUrl.pop();

            for(var paramName in params) {

                if(paramName == "currentHole" || paramName == "currentShot") {
                    newParams.push(params[paramName]);
                }
            }
            nextStep = baseUrl.join('/') + "/" + newParams.join('/');

            this.continue(nextStep);
        };

        this.saveShot = function (nextPieceOfData) {
            var deferred = $q.defer(),
                dataToSave = this._formatPathData(),
                params = $routeParams;

            if(!this.shotLog[params.currentHole]) {
                this.shotLog[params.currentHole] = [];
            };

            this.shotLog[params.currentHole].push(dataToSave);

            $http.put(this.roundEndpoint + "/.json", this.shotLog);

            return deferred.promise;
        };
})