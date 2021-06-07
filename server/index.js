const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = 3000;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/dist')))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
});
