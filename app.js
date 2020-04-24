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

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;

// Database connection (update with user specific info)
var mysql = require('mysql');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'user',
  password: 'password',
  database: 'expenses'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// Creates database trackr
app.get('/createDatabase', function(req, res) {
  let sql = "CREATE DATABASE IF NOT EXISTS trackr";
  db.query(sql, function(err) {
    if(err) throw err;
    console.log("Database created");
  });
});

// Creates table expenses
app.get('/createTable', function(req, res) {
  db.query('CREATE TABLE IF NOT EXISTS expenses('
    + 'name VARCHAR(255) NOT NULL,'
    + 'cost DOUBLE NOT NULL,'
    + 'category ENUM(\'Groceries\', \'Clothing\', \'Entertainment\'', 
    + '\'Housing\', \'Other\') NOT NULL,'
    +  ')', function (err) {
      if (err) throw err;
      console.log("Table created");
    });
});

// Submits new expense to db
app.post('/expenseSubmitted', function(req, res) {
  var sql = `INSERT INTO expenses (name, cost, category) 
  VALUES ('${req.body.name}', ${req.body.cost}, '${req.body.category}')`;
  db.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Expense added");
  });
});

// Renders page displaying list of expenses
app.get('/expenses', function(req, res, next) {
  var sql = 'SELECT * FROM expenses';
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('expense-list', {title: 'User List', userData: data});
    console.log("Expenses viewed");
  });
});

// Deletes row from table (under construction)
app.post('/itemDeleted', function(req, res, next) {
  console.log(req.params.id.name);
  var sql = `DELETE FROM expenses WHERE name = '${req.params.item.name}'`;
  db.query(sql, function (err, data, fields) {
    if (err) throw err;
    res.render('expense-list', {title: 'User List', userData: data});
    console.log("Item deleted");
  });
});
