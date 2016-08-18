/*
Author: Ryan Peters
Date: 08/06/16
Assignment: How To
Description: 
*/
var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'home'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5000);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

/***************************************************************
** Description: Displays the Intro page
***************************************************************/
app.get('/intro', function(req,res,next){
	var context = {};
	context.title='Using the Curses Library with C++';
	context.next = 'useCurses';
    res.render('intro',context);
});

/***************************************************************
** Description: Displays Using Curses
***************************************************************/
app.get('/useCurses', function(req, res){
	var context = {};
	context.title = 'Getting Started';
	context.prev = '/intro';
	context.next = '/setup';
	res.render('getStart', context);
});

/***************************************************************
** Description: Displays page about configuring Curses
***************************************************************/
app.get('/setup', function(req, res){
	var context = {};
	context.title = 'Getting Started';
	context.prev = '/useCurses';
	context.next = '/output';
	res.render('setup', context);
});

/***************************************************************
** Description: Displays page about output functions
***************************************************************/
app.get('/output', function(req, res){
	var context = {};
	context.title = 'Curses Output';
	context.prev = '/setup';
	context.next = '/input';
	res.render('output', context);
});

/***************************************************************
** Description: Displays page about getting input
***************************************************************/
app.get('/input', function(req, res){
	var context = {};
	context.title = 'Curses Input';
	context.prev = '/output';
	context.next = '/delete';
	res.render('input', context);
});

/***************************************************************
** Description: Displays page about deleting characters
***************************************************************/
app.get('/delete', function(req, res){	
	var context = {};
	context.title = 'Curses Delete';
	context.prev = '/input';
	context.next = '/attributes';
	res.render('delete', context);
});

/***************************************************************
** Description: Displays page about attributes
***************************************************************/
app.get('/attributes', function(req, res){	
	var context = {};
	context.title = 'Curses Attributes'
	context.prev = '/delete';
	res.render('attributes', context);
});

/***************************************************************
** Description: Reports page not found error to the user.
***************************************************************/
app.use(function(req, res){
	res.type('plain/text');
	res.status(404);
	res.send('404 - Not Found');
});

/***************************************************************
** Description: Reports general server error to the user.
***************************************************************/
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
})

/***************************************************************
** Description: Sets the app to start listening
***************************************************************/
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
