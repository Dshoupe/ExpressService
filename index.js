var express = require('express');
var pug = require('pug');
var path = require('path');
var config = require('./menu');

var app = express();

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(`${__dirname}/public`)));

app.get('/', function (req, res) {
    res.render('title', {
        title: 'IRS (Internal Revenue Service)',
        "config": config
    })
});

app.get('/services', function (req, res) {
    res.render('services', {
        title: 'Services',
        "config": config
    })
});

app.get('/order', function (req, res) {
    res.render('order', {
        title: 'Order',
        "config": config
    })
});

app.post('/submitted', function(req, res){
    res.render('submitted', {
        title: 'Thanks for submitting!',
        "config": config
    })
});

app.listen(3000);