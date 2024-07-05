const express = require('express');
const bodyParser = require('body-parser');
const index = require('./src/index');

const app = express();
app.use(bodyParser.json());

app.use('/', index);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
