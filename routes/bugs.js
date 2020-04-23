const express = require('express');
const router = express.Router();
var mysql = require('mysql');

const bugTypes = require('../bugTypes');

var connection = mysql.createConnection({
  host: '130.211.219.137',
  user: 'deva',
  password: 'asdf',
  database: 'Bugs',
  dateStrings: false,
});

connection.connect((err) => {
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

router.get('/:id', (req, res) => {
  var query1 = 'SELECT * FROM BUGS WHERE id=' + req.params.id;
  var query2 =
    'SELECT * FROM NOTES WHERE bugId=' +
    req.params.id +
    ' ORDER BY dateTime DESC';
  try {
    connection.query(query1, (err, result1) => {
      if (err) throw err;

      connection.query(query2, (err, result2, fields) => {
        if (err) throw err;

        result1[0].notes = result2;
        res.json(result1[0]);
      });
    });
  } catch (err) {
    res.json({ success: false });
  }
});

router.post('/notes', (req, res) => {
  const { bugId, content } = req.body;
  var dateTime = new Date();
  dateTime = dateTime.toISOString();

  const query =
    'INSERT INTO NOTES (bugId, content) ' +
    'VALUES (' +
    bugId +
    ", '" +
    content +
    "')";
  // const query =
  //   'INSERT INTO NOTES (bugId, content, dateTime) ' +
  //   'VALUES (' +
  //   bugId +
  //   ", '" +
  //   content +
  //   "', '" +
  //   dateTime +
  //   "')";

  console.log(query);

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({ success: false });
    } else {
      console.log(fields);
      res.json({ success: true });
    }
  });
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

  connection.query(query, (error) => {
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
