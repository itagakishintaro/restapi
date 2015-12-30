var express = require( 'express' );
var router = express.Router();
var mongoose = require( 'mongoose' );
// MongoDB用ファイルを指定
var mongo = require( '../mongo' );

// For Cross Origin
router.all( '/*', function ( req, res, next ) {
    res.contentType( 'json' );
    res.header( 'Access-Control-Allow-Origin', '*' );
    next();
} );

// GET find
router.get( '/', function ( req, res ) {
    mongo.find( 'mean', {}, {},
        function ( list ) {
            res.send( list );
        }
    );
} );

// GET find :id
router.get( '/:id', function ( req, res ) {
    mongo.find( 'mean', {
            _id: mongoose.Types.ObjectId( req.params.id )
        }, {},
        function ( list ) {
            res.send( list );
        }
    );
} );

// POST insert data
router.post( '/', function ( req, res ) {
    mongo.insert( 'mean', {
            name: req.body.name,
            description: req.body.description,
            evaluation: req.body.evaluation,
            picture: req.body.picture
        }, {},
        function ( result ) {
            res.send( result );
        }
    );
} );

// PUT update data
router.put( '/:id', function ( req, res ) {
    mongo.update( 'mean', {
            _id: mongoose.Types.ObjectId( req.params.id )
        }, {
            name: req.body.name,
            description: req.body.description,
            evaluation: req.body.evaluation,
            picture: req.body.picture
        }, {},
        function ( result ) {
            res.send( result );
        }
    );
} );

// DELETE remove data
router.delete( '/:id', function ( req, res ) {
    mongo.remove( 'mean', {
            _id: mongoose.Types.ObjectId( req.params.id )
        }, {
            justOne: false
        },
        function ( result ) {
            res.send( result );
        }
    );
} );

module.exports = router;