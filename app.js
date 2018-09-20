var express = require('express');
var chalk = require('chalk');
var morgan = require('morgan');
var debug = require('debug')('app');
var path = require('path');
var bodyParser = require('body-parser');
var request = require('request');

const app = express();

const port = process.env.PORT;
const api = process.env.APIPATH;

app.use(express.static(path.join(__dirname, '/public')));
app.use('/js', express.static(path.join(__dirname, '/public/js')));
app.use('/css', express.static(path.join(__dirname, '/public/css')));

app.use(bodyParser.urlencoded());
app.use(morgan('tiny'));

app.set('views', './src/views');
app.set('view engine', 'ejs');

var formpage = express.Router();

formpage.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './src/views/detail.html'))
});


var submit = express.Router();
submit.post('/', (req, res) => {
    if(!req.body){
        res.render('error', {'err':'unable to save your data'});
    }
    else{
        console.log("requesting... to " + api);
        var requestdata = req.body;
        request.post({
            "headers": {'content-type' : 'application/json'},
            "url":api,
            "body":requestdata,
            "json":true
        }, (err, resp, body)=>{
            if(err){
                console.log(err);
                res.render('error',{'err':'service not rechable'});
            }
            else{
                console.log(body);
                res.render('success', {'success':'you are suscribed'});
            }
        });
    }
});

app.use('/detail', formpage);
app.use('/submit', submit);
app.get('/', (req, res) => {
    res.render('index');
});

app.listen(port, function () {
    console.log(`listening on ${port}`);
});