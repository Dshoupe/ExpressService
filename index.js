var express = require('express');
var pug = require('pug');
var path = require('path');
var config = require('./menu');
var serviceCategories = require('./categories');
var bodyParser = require('body-parser');
var fs = require('fs');

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
    var serviceNames = [];
    for (var i = 0; i < 3; i++) {
        var test = serviceCategories.categories[i];
        for (var x = 1; x < 2; x++) {
            var test2 = test[x];
            for (var k = 0; k < 8; k++) {
                var test3 = test2[k];
                var final = test3[0];
                serviceNames.push(final);
            }
        }
    }
    var checkedServices = [];
    var checkedServicesString = '';
    for (var i = 0; i < 24; i++) {
        // console.log(eval(`req.body.${serviceNames[i]}`));
        var serviceNameHolder = serviceNames[i];
        var service = `req.body.${serviceNameHolder}`
        if(eval(`req.body.${serviceNameHolder}`) != null){
            eval('checkedServices.push(`${i+1}:${eval(service)}`)');
        }
    }
    for (var i = 0; i < checkedServices.length; i++) {
        console.log(checkedServices[i]);
    }
    var order = {
        name: req.body.name,
        address: req.body.address,
        phone: req.body.phone,
        checkedServices: checkedServices
    };
    var orderToSave = [
        ["Name", order.name],
        ["Address", order.address],
        ["Phone", order.phone],
        ["ServicesOrdered", checkedServices]
    ];
    fs.writeFile('./public/order.txt', orderToSave, function (err) {
        if (err) throw err;
        console.log('It\'s saved! in same location.');
    });
    res.render('submitted', {
        title: 'Thanks for submitting!',
        "config": config,
        order: order
    })
});

app.listen(3000);