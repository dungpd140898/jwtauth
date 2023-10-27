const express = require('express');
const mongoose = require('mongoose');
require ('dotenv').config();
var cors = require('cors')

const MONGO_URL = process.env.MONGO_URL
const PORT = process.env.PORT || 3000

const app = express();
const errors = require('./middlewares/errors');

mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
      console.log('connected to MongoDB')
      app.listen(PORT, ()=> {
          console.log(`Node API app is running on port ${PORT}`)
      });
  }).catch((error) => {
      console.log(error)
  })
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());

app.use("/users", require("./routes/users.routes"));

app.use(errors.errorHandler);

