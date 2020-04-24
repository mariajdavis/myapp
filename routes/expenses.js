const app = require('./app');

app.router.get('/expense-list', function(req, res, next) {
    var sql = 'SELECT * FROM expenses';
    app.db.query(sql, function (err, data, fields) {
      if (err) throw err;
      console.log("Expenses viewed");
      res.render('/expense-list', {title: 'Expense List', userData: data});
    });
  });

module.exports = router;