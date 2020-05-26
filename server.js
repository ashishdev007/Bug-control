const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

const authentication = require('./middleware/authentication');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', authentication, (req, res) => {
  res.send(req.user);
});

app.use('/bugs', require('./routes/bugs'));
app.use('/users', require('./routes/users'));

const port = process.env.PORT || 1500;
app.listen(port, () => console.log('Server has started on port ' + port));
