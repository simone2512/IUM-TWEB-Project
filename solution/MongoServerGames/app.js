var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const database = require("./databases/database");
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('../MongoServerGames/swagger/indexDocumentation.json');
app.use('/documentationMongo', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

module.exports = app;
