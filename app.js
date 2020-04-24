var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();

app.listen('3000', () => {
  console.log('Server started on port 3000');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;

// database connection
var mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Thesopranos1!',
  database: 'expenses'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

router = express.Router();

app.get('/expenses', function(req, res, next) {
  var sql = 'SELECT * FROM expenses';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('expense-list', {title: 'User List', userData: data});
    console.log("Expenses viewed");
  });
});

module.exports = router;

app.get('/', function(req, res) {
  console.log("First get");
});

app.get('/createDatabase', function(req, res) {
  let sql = "CREATE DATABASE IF NOT EXISTS trackr";
  db.query(sql, function(err) {
    if(err) throw err;
    console.log("Database created");
  });
});

app.get('/createTable', function(req, res) {
  db.query('CREATE TABLE IF NOT EXISTS expenses('
    + 'name VARCHAR(255) NOT NULL,'
    + 'cost DOUBLE NOT NULL,'
    + 'category ENUM(\'Groceries\', \'Clothing\', \'Entertainment\', \'Housing\', \'Other\') NOT NULL,'
    +  ')', function (err) {
      if (err) throw err;
      console.log("Table created");
    });
});

app.post('/expenseSubmitted', function(req, res) {
  var sql = `INSERT INTO expenses (name, cost, category) VALUES ('${req.body.name}', ${req.body.cost}, '${req.body.category}')`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Expense added");
  });
});

// exports.expenseSubmitted = function (req, res) {
//   console.log(req.body);
//   res.render('expenseSubmitted', req.body);
// };
