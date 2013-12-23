angular.module('TnG')

.service('PlayTracking', function ($http, $location) {
    this.trackedHoles = [];
    this.trackedShots = {};
    this.activeShot = {};

    this.trackShot = function (holeNumber, shotNumber, clubUsed) {
        var shotData = {
            "holeNumber": holeNumber,
            "shotNumber": shotNumber,
            "clubUsed": clubUsed.code
        };
        this.activeShot = shotData;
    };

    this.trackMood = function (moodSwing, shotData) {
        shotData = shotData || this.activeShot;
        shotData.moodSwing = moodSwing;

        this.saveTrack(shotData);
    };

    this.saveTrack = function (shotData) {
       if(shotData.shotNumber){
           this.trackedShots[shotData.shotNumber] = shotData;
       } else {
           console.log('No shot number');
           console.log(shotData);
       }
    };

    this.continue = function (nextStep) {
        $location.path(nextStep);
    };

})