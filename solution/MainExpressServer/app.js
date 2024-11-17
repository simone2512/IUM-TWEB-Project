var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var competitionsRouter = require('./routes/competitions');
var competitionSelectedRouter = require('./routes/competitionSelected');
var chatRouter = require('./routes/chat');
var playersRouter = require('./routes/players');
var squadsRouter = require('./routes/squads');
var usersRouter = require('./routes/users');
var squadSelectedRouter = require('./routes/squadSelected');
var gamesRouter = require('./routes/games');
var gameSelectedRouter = require('./routes/gameSelected');
var playerSelectedRouter = require('./routes/playerSelected');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/chat', chatRouter);
app.use('/competitions', competitionsRouter);
app.use('/competitionSelected', competitionSelectedRouter);
app.use('/players', playersRouter);
app.use('/squads', squadsRouter);
app.use('/users', usersRouter);
app.use('/squadSelected', squadSelectedRouter);
app.use('/games', gamesRouter);
app.use('/gameSelected', gameSelectedRouter);
app.use('/playerSelected', playerSelectedRouter)

const swaggerUi = require('swagger-ui-express');
const openApiDocumentation = require('./swagger/SwaggerDocumentation.json');
app.use('/documentationMainServer', swaggerUi.serve, swaggerUi.setup(openApiDocumentation));

module.exports = app;
