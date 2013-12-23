angular.module('TnG')

.service('PlaySetup', function ($http, $location) {
    var endpoint = "https://talkngolf.firebaseio.com/";

    this.getPanes = function (collection, callback) {
        $http({method: 'GET', url: endpoint + collection + '/.json'})
            .success(function (data, status, headers, config) {
                callback(data);
            })
    };

    this.continuePlaySetup = function (nextStep, dataToSave) {
        $location.path(nextStep);
    };
})