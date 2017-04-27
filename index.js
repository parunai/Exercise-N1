const pg = require('pg');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function (err, client, done) {
    client.query('SELECT * FROM test_table', function (err, result) {
      done();
      if (err) {
        console.error("An error occurred on the server. Error: " + err);
      } else {
        response.render('pages/db', { rows: result.rows });
      }
    });
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('App running on Port: ' + PORT);
});
