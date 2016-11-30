var Sequelize = require('sequelize');
var express = require('express');
var databaseURL = 'sqlite://db';
var sequelize = new Sequelize(databaseURL);	
var app = express();
var port = 3000;
var blogPost = [];
var bodyParser = require("body-parser");

var Post = sequelize.define('Post', {
    //create title and content as strings,
    title: Sequelize.STRING,
    content: Sequelize.STRING,
    dateTime:Sequelize.DATE
});

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/list', function(req, res){
	console.log("hi this lis rendering ");
	Post.findAll().then(function(rows){
			res.render('list', {blogPost: rows});
	});
});

app.get('/Post.json', function(req, res){
	Post.findAll().then(function(){
		res.json(Post);
	});
});

app.post('/create', function(req, res){
	var d = new Date();
	var newEntre = {
		'title': req.body.title,
		'content':req.body.content,
		'dateTime': d
	}
	blogPost.push(newEntre);

	console.log('Hi guys this my express app');
	Post.create(newEntre).then(function(){
		res.render('list', {blogPost: blogPost});
	});
	
 });
sequelize.sync().then(function(){
	app.listen(port, function(){
		console.log("app on port "+ port);
	});

});
