'use strict';

var app = angular.module('TnG')

.service('CurrentRound', function (CurrentPlayer, $firebase) {
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
    }
});