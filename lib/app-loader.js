var scripts = {};

scripts.App = [
    "app/app.js"
];


for(var scriptCategory in scripts){

    document.writeln( "<!--[START] "+ scriptCategory +"-->"+"\n" );

    scripts[scriptCategory].forEach(function( scriptFile ){

        document.writeln( '<script type="text/javascript" src="'+scriptFile+'"></script>'+ '\n');

    });
};