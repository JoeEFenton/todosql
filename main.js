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
  models.Todos.create({
  title: req.body.todo
}).then(function(todo) {
  res.redirect('/');
})
});

app.get("/", function(req, res) {
 models.Todos.findAll().then(function(todos){
   todos.forEach(function(todo){
     console.log('one more todo')
   })
   res.render("index", {joeskey: todos})
 });

});

app.post('/completed', function(req, res){
  models.Todos.destroy({where: {id:Number(req.body.delete)} })
  .then(function(erase){
    res.redirect("/");
  })

});

app.listen(process.env.PORT || 3000, function(req, res){
  console.log ("hey hey hey")
});
