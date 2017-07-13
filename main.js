const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const mustacheExpress = require('mustache-express');
const models = require('./models');

const app = express();
app.engine("mustache", mustacheExpress());
app.set('views', './views')
app.set('view engine', 'mustache')

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){
  models.Todo.create({
  title: req.body.todo
}).then(function(req, res) {
  res.redirect('/');
})
})
