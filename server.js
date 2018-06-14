require('./api/config/config');

const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(require('./api/controllers/insert.controller.js'));
app.use(require('./api/controllers/get.controller'));
app.use(require('./api/controllers/delete.controller'));

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = { app };
