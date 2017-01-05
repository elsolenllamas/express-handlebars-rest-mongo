var express = require('express'),
    exphbs  = require('express-handlebars'),
    path = require('path'),
    logger = require('morgan'),
    bodyParser = require('body-parser');

var db = require('./connection/db'),
    product = require('./connection/products');

var routes = require('./routes/index'),
    products = require('./routes/products');

var app = express();

// handlebars engine setting up
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/products', products);

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;
