const express = require('express');
const app = express();
const cors = require('cors');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/bugs', require('./routes/bugs'));

const port = process.env.PORT || 1500;
app.listen(port, () => console.log('Server has started on port ' + port));
