var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var config = require('./config');
var passport = require('passport')
    , FacebookStrategy = require('passport-facebook').Strategy;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/salesmart', function(){
    console.log('Connected to MongoDB!');
});

var routes = require('./routes/index');
var HobbystRegistrationRoute = require('./routes/HobbiestRegistrationRoute');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

passport.use(new FacebookStrategy({
        clientID: config.oauth.clientId,
        clientSecret: config.oauth.clientSecret,
        callbackURL: "/"
    },
    function (accessToken, refreshToken, profile, done) {
        /*User.findOrCreate(..., function (err, user) {
            if (err) {
                return done(err);
            }
            done(null, user);
        }
        )
        ;*/
        console.log(accessToken);
        console.log(refreshToken);
        console.log(profile);
        console.log(done);
    }
));

app.use('/', routes);
app.use('/hregister', HobbystRegistrationRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

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


module.exports = app;
