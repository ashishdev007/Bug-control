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
  timezone: 'Z',
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
  const { bugId } = req.body;
  const content = fixString(req.body.content);

  const query =
    'INSERT INTO NOTES (bugId, content) ' +
    'VALUES (' +
    bugId +
    ', "' +
    content +
    '")';

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.log(error);
      res.json({ success: false });
    } else {
      console.log(results);
      res.json({ success: true });
    }
  });
});

router.post('/', (req, res) => {
  const { userid, title, category } = req.body;
  const description = fixString(req.body.description);

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

router.put('/:id', (req, res) => {
  var { bug } = req.body;

  bug.description = fixString(bug.description);
  const { description, category, reproducible, severity, bugDeadline } = bug;
  const deadline = new Date(bugDeadline);

  const sql = `UPDATE BUGS SET description = ? , category = ? , reproducible = ? , severity = ? , bugDeadline = ? WHERE id = ?`;

  connection.query(
    {
      sql,
      values: [description, category, reproducible, severity, deadline, bug.id],
    },
    (error, results, fields) => {
      if (error) {
        console.log(error);

        res
          .status(403)
          .json({ msg: "Something went wrong! Can't update bug." });
      } else {
        console.log(results);

        res.status(200).json({ success: true });
      }
    }
  );
});

router.delete('/:id', (req, res) => {
  const query1 = 'DELETE FROM NOTES WHERE bugId = ' + req.params.id;
  const query2 = 'DELETE FROM BUGS WHERE id = ' + req.params.id;

  connection.query(query1, (error) => {
    try {
      if (error) throw error;
      else {
        connection.query(query2, (error) => {
          if (error) throw error;
          else res.status(200).send({ success: true });
        });
      }
    } catch (err) {
      console.log(err);
      res.status(403).send({ msg: 'Unable to delete bug!' });
    }
  });
});

router.get('/data/dealines', (req, res) => {
  connection.query(
    {
      sql:
        'SELECT title, id, bugDeadline FROM BUGS WHERE bugDeadline IS NOT NULL ORDER BY bugDeadline',
    },
    (err, results) => {
      if (err) res.status(400).json({ msg: "Can't fetch bug deadlines." });
      else {
        res.status(200).json({ results });
      }
    }
  );
});

module.exports = router;

const fixString = (string) => {
  return string.replace(/"/g, '\\"');
};
