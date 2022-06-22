const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

authRoutes = require("./routes/auth");
dpRoutes = require("./routes/dataProduct");
dataRoutes = require("./routes/data");

app = express();

require("dotenv").config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
  
app.use('/auth', authRoutes);
app.use('/dp', dpRoutes);
app.use('/data', dataRoutes);

app.use((req, res) => {
    return res
});


mongoose.connect(process.env.ConnectionLink, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("app running");
    const server = app.listen(process.env.PORT || 3000);
  
  })
  .catch((err) => {
    console.log("error in the mongo db connection");
    console.log(err);
  });