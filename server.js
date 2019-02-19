const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

// fetches root files from client/build
//app.use(express.static(path.join(__dirname, 'client', 'build')));

// May only be exist once in app
mongoose.connect("mongodb://my_user:my_password@localhost:27017/mern", { useNewUrlParser: true });

const Schema = mongoose.Schema;
const memberSchema = new Schema({
  firstName: String,
  lastName: String
});
const Member = mongoose.model("member", memberSchema);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(`${__dirname}/favicon.ico`));
});

app.get('/members', (req, res) => {
  Member.find({}, "firstName lastName").then(members => {
    if (members !== null && members.length > 0) {
      res.write(JSON.stringify(members));
    } else {
      res.write("No members found");
    }
    res.end();
  });
}).listen(80);