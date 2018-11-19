const config = require( "./index" );
const mongoose = require( "mongoose" );

module.exports = function( app ) {
    
    var dbURI = "mongodb://" +
	encodeURIComponent(config.db.username) + ":" +
	encodeURIComponent(config.db.password) + "@" +
	config.db.host + ":" +
	config.db.port + "/" +
    config.db.name;

    console.log(dbURI);

    
    mongoose.connect( dbURI, { useNewUrlParser: true } );

    mongoose.connection.on('error', function (err) {
        if (err) throw err;
    });
    mongoose.Promise = global.Promise;

    process.on( "SIGINT", cleanup );
    process.on( "SIGTERM", cleanup );
    process.on( "SIGHUP", cleanup );

    if ( app ) {
        app.set( "mongoose", mongoose );
    }
};

function cleanup( ) {
    mongoose.connection.close( function( ) {
        process.exit( 0 );
    } );
}