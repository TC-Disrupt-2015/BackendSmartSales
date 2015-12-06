var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var multer = require('multer');
var uploading = multer({
    dest: __dirname + '/../public/uploads/',
    limits: {fileSize: 1000000, files: 1}
});

var config = require('./config');

var mongoose = require('mongoose');
var mongoDBConnectionString = "";
if(config.db.username) {
    mongoDBConnectionString = 'mongodb://' +
        config.db.username + ':' +
        config.db.password + '@' +
        config.db.hostname + ':' +
        config.db.port + '/' +
        config.db.dbName
} else {
    mongoDBConnectionString = 'mongodb://' +
        config.db.hostname + ':' +
        config.db.port + '/' +
        config.db.dbName
}

mongoose.connect(mongoDBConnectionString, function (err) {
    if (err) {
        console.log(err);
        process.exit(1);
        return;
    }

    console.log('Connected to MongoDB!');
});

var OrderModel = require('./models/OrderModel')(mongoose);
var ProductModel = require('./models/ProductModel')(mongoose);
var MerchantModel = require('./models/MerchantModel')(mongoose);
var HobbyistModel = require('./models/HobbyistModel')(mongoose);

var routes = require('./routes/index');
var HobbyistRoute = require('./routes/HobbyistRoute')(express, HobbyistModel);
var ProductRegistrationRoute = require('./routes/ProductRoute')(express, uploading, ProductModel, MerchantModel, HobbyistModel);
var OrderRoute = require('./routes/OrderRoute')(express, OrderModel);
var MerchantRoute = require('./routes/MerchantRoute')(express, MerchantModel);

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/hobbyist', HobbyistRoute);
app.use('/product', ProductRegistrationRoute);
app.use('/order', OrderRoute);
app.use('/merchant', MerchantRoute);

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
