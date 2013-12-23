var scripts = {};

scripts.Lib = [
    "lib/angular/1.2.6/angular.min.js",
    "lib/angular/1.2.6/angular.min.js.map",
    "lib/angular/1.2.6/angular-route.min.js",
    "lib/angular/1.2.6/angular-route.min.js.map",
    "app/app.js"
];

scripts.PlaySetup = [
    "app/routes/play_setup.js",
    "app/services/play_setup.js",
    "app/controllers/play_setup.js"
];

scripts.Test = [
//    "test/spec/play_setup_spec.js"
];

for(var scriptCategory in scripts){

    document.writeln( "<!--[START] "+ scriptCategory +"-->"+"\n" );

    scripts[scriptCategory].forEach(function( scriptFile ){

        document.writeln( '<script type="text/javascript" src="'+scriptFile+'"></script>'+ '\n');

    });
};