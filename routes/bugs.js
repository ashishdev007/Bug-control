const express = require('express');
const router = express.Router();
var mysql = require('mysql');

const bugTypes = require('../bugTypes');

var connection = mysql.createConnection({
  host: '130.211.219.137',
  user: 'deva',
  password: 'asdf',
  database: 'Bugs'
});

connection.connect(err => {
  if (err) {
    console.log(err);
  } else {
    console.log('Connected to Database!');
  }
});

router.get('/', (req, res) => {
  var bugs = {};

  try {
    connection.query(
      'SELECT * FROM BUGS WHERE category = "' + bugTypes.OPEN + '"',
      (err, result) => {
        if (err) throw err;
        bugs[bugTypes.OPEN] = result;

        connection.query(
          'SELECT * FROM BUGS WHERE category = "' + bugTypes.IN_PROGRESS + '"',
          (err, result) => {
            if (err) throw err;
            bugs[bugTypes.IN_PROGRESS] = result;

            connection.query(
              'SELECT * FROM BUGS WHERE category = "' +
                bugTypes.TEST_PENDING +
                '"',
              (err, result) => {
                if (err) throw err;
                bugs[bugTypes.TEST_PENDING] = result;

                connection.query(
                  'SELECT * FROM BUGS WHERE category = "' +
                    bugTypes.RE_OPENED +
                    '"',
                  (err, result) => {
                    if (err) throw err;
                    bugs[bugTypes.RE_OPENED] = result;

                    connection.query(
                      'SELECT * FROM BUGS WHERE category = "' +
                        bugTypes.CLOSED +
                        '"',
                      (err, result) => {
                        if (err) throw err;
                        bugs[bugTypes.CLOSED] = result;
                        bugs.success = true;
                        res.json(bugs);
                      }
                    );
                  }
                );
              }
            );
          }
        );
      }
    );
  } catch (err) {
    bugs.success = false;
  }
});

router.post('/', (req, res) => {
  const { userid, title, description, category } = req.body;

  const query =
    'INSERT INTO `BUGS` (`id`, `userid`, `title`, `description`, `category`) ' +
    'VALUES (NULL, ' +
    userid +
    ' , "' +
    title +
    '" , "' +
    description +
    '" , "' +
    category +
    '")';

  connection.query(query, (error, results) => {
    if (error) {
      res.json({ success: false });
    } else {
      res.json({ success: true, insertId: results.insertId });
    }
  });
});

router.delete('/:id', (req, res) => {
  const query = 'DELETE FROM BUGS WHERE id = ' + req.params.id;

  connection.query(query, error => {
    if (error) res.send({ success: false });
    else res.send({ success: true });
  });
});

router.post('/modify', (req, res) => {
  const query =
    'UPDATE BUGS SET category = "' +
    req.body.newCategory +
    '" where id = ' +
    req.body.id;

  connection.query(query, (error, results) => {
    if (error) res.send({ success: false });
    else if (results.affectedRows == 0) {
      res.send({ success: false });
    } else {
      res.send({ success: true });
    }
  });
});

module.exports = router;
