var express = require('express');
var app = express();
var port = 3000;
var blogPost = [];
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/list', function(req, res){
	console.log("hi this lis rendering ");
	res.render('list', {blogPost: blogPost});
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
	res.render('list', {blogPost: blogPost});
 });

app.listen(port, function(){
	console.log("app on port "+ port);
});