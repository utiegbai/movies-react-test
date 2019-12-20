const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 5000;

// enable cors
app.use(cors({
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}))
app.use('/api', routes)


app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});