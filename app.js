var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var program = require('commander');

program
    .option('-e --extIP <extIP>', 'External IP to listen on', String)
    .option('-d --dbIP <dbIP>', 'IP address of mongodb server', String)
    .option('-p --port <port>', 'Port to listen on', Number, process.env.PORT || 8080);
program.parse(process.argv);


var mongo = require('mongodb');
mongo.connect(program.dbIP, startListening);

var db = null;
var studentData = null;

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

function startListening(err, db) {
    // Must be before error handling and catching 404
    require('./routes/studentPost.js')(app, studentData);

    if (err) {
        // Print error to console
        return console.dir(err);
    } else {
        // Assign db to what we get
        this.db = db;

        db.createCollection('studentData', function (err, collection) {
            studentData = collection;
            app.listen(program.port, program.extIP);
            console.log("The good stuff lives on port: " + program.port);
        });
    }

// error handlers

// catch 404 and forward to error handler
// Should be after all routing is done
    app.use(function (req, res, next) {
        console.log("Not found!");
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });
}
