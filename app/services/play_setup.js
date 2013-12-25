angular.module('TnG')

.service('PlaySetup', function ($http, $location) {
    var endpoint = "https://talkngolf.firebaseio.com/";

    this.getPageData = function (collection, callback) {
        $http({method: 'GET', url: endpoint + collection + '/.json'})
            .success(function (retrievedData, status, headers, config) {
                callback(retrievedData);
            })
            .error(function (error, status, headers, config) {
                callback(error);
            })
    };

    this.continuePlaySetup = function (nextStep, dataToSave) {
        $location.path(nextStep);
    };

    this.defaultClubSet = {

    }
})