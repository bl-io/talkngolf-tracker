'use strict';

var app = angular.module('TnG')

.service('CurrentRound', function (CurrentPlayer, $firebase, $location) {
    var currentPlayer = CurrentPlayer.getUsername();
    var roundsEndpoint = 'https://tng-rounds.firebaseio.com/';
    var roundsRef = new Firebase(roundsEndpoint);

    var currentRoundRefUrl = roundsEndpoint + currentPlayer;
    var currentRoundRef = new Firebase(currentRoundRefUrl);
    var currentRound = $firebase(currentRoundRef);

    this.setCurrentRound = function (parentScope, selectedModeToTrack) {
        parentScope.currentRound = $firebase(roundsRef);
        parentScope.currentRound[currentPlayer] = {
            "mode": selectedModeToTrack,
            "player": currentPlayer,
            "start_time": new Date().getTime(),
            "tracking": {
                "details": "here"
            }
        };
        parentScope.currentRound.$save(currentPlayer);
    };

    this.getCurrentRound = function (parentScope) {
        parentScope.currentRound = currentRound;
    };

    this.saveToRound = function (parentScope, dataLabel, dataContents) {
        parentScope.currentRound[dataLabel] = dataContents;
        parentScope.currentRound.$save(dataLabel);
    };

    this.endRound = function (parentScope) {
        var roundToSave, currentRoundData = {};
        var archiveRefUrl = 'https://tng-archives.firebaseio.com/'+currentPlayer;
        var archiveRef = new Firebase(archiveRefUrl);

        roundToSave = $firebase(archiveRef);

        for(var unfilteredData in currentRound) {
            if(unfilteredData.charAt(0) !== '$') {
                currentRoundData[unfilteredData] = currentRound[unfilteredData];
            }
        }
        currentRoundData.end_time = new Date().getTime();
        currentRoundData.duration = currentRoundData.end_time - currentRoundData.start_time;

        roundToSave.$add(currentRoundData);
        currentRound.$remove();
        $location.path('/');
    };
});