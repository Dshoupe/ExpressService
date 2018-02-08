var express = require('express');
var pug = require('pug');
var path = require('path');
var config = require('./menu');
var serviceCategories = require('./categories');
var bodyParser = require('body-parser');

var app = express();

app.set('view engine', 'pug');
app.set('views', `${__dirname}/views`);
app.use(express.static(path.join(`${__dirname}/public`)));

var urlencodedParser = bodyParser.urlencoded({
    extended: true
});

app.get('/', function (req, res) {
    res.render('title', {
        title: 'D-Day (Drink Day)',
        "config": config
    })
});

app.get('/services', function (req, res) {
    res.render('services', {
        title: 'Services',
        "config": config,
        "serviceCategories": serviceCategories
    })
});

app.get('/order', function (req, res) {
    res.render('order', {
        title: 'Order',
        "config": config,
        "serviceCategories": serviceCategories
    })
});

app.post('/submitted', urlencodedParser, function (req, res) {
    var checkedServices = [];
    
    var servicesTest = req.body.services;
    var order = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        servicesTest: servicesTest
    }
    res.render('submitted', {
        title: 'Thanks for submitting!',
        "config": config,
        order: order
    })
});

app.listen(3000);