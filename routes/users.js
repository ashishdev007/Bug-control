const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
var mysql = require('mysql');

const authentication = require('../middleware/authentication');

var connection = mysql.createConnection({
  host: '130.211.219.137',
  user: 'deva',
  password: 'asdf',
  database: 'Users',
  dateStrings: false,
});

// Login
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: 'Please enter all fields.' });
  }

  var user;

  connection.query(
    { sql: 'SELECT * FROM USERS WHERE email = ?', values: [email] },
    (err, results) => {
      if (err) {
        return res.status(403).json({ msg: "Can't login user." });
      } else if (results.length == 0) {
        return res.status(400).json({ msg: "User doesn't exist" });
      } else {
        user = results[0];

        try {
          bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
              return res.status(400).json({ msg: 'Invalid Credentials' });
            } else {
              var token = jwt.sign({ id: user.id }, process.env.jwtSecret);
              res.json({ token });
            }
          });
        } catch (err) {
          res.status(403).json({ msg: "Can't generate token." });
        }
      }
    }
  );
});

//Signup
router.post('/', (req, res) => {
  var { email, password, fname, lname } = req.body;

  if (!email || !password || !fname || !lname) {
    res.status(400).json({ msg: 'Please enter all fields' });
  } else {
    connection.query(
      {
        sql: 'SELECT * FROM USERS WHERE email = ?',
        values: [email],
      },
      (error, results) => {
        if (error) {
          res
            .status(403)
            .json({ msg: 'Something went wrong! Please try again' });
        } else if (results.length > 0) {
          res.status(400).json({ msg: 'User already exists!' });
        } else {
          bcrypt.hash(password, 10, function (err, hash) {
            if (err) {
              res
                .status(403)
                .json({ msg: 'Something went wrong! Please try again' });
            } else {
              password = hash;

              connection.query(
                {
                  sql:
                    'INSERT INTO USERS(email, password, fname, lname) values(?,?,?,?)',
                  values: [email, password, fname, lname],
                },
                (error, results) => {
                  if (error) {
                    res
                      .status(403)
                      .json({ msg: 'Something went wrong! Please try again' });
                  } else {
                    return res
                      .status(200)
                      .json({ msg: 'User Successfully added' });
                  }
                }
              );
            }
          });
        }
      }
    );
  }
});

//User info
router.get('/user', authentication, (req, res) => {
  connection.query(
    { sql: 'SELECT * FROM USERS WHERE id = ?', values: [req.user.id] },
    (error, results) => {
      if (error) {
        return res.status(403).json({ msg: "Can't find user." });
      } else if (results.length == 0) {
        return res.status(400).json({ msg: "User doesn't exist" });
      } else {
        const { fname, lname, email, id } = results[0];

        res.status(200).json({ fname, lname, email, userId: id });
      }
    }
  );
});

module.exports = router;
