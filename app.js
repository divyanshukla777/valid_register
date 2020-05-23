var express=require('express');
var mysql=require('mysql');
var path = require('path');
var bodyParser = require('body-parser');


var con=require('./modules/dbconnect');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
var indexRouter = require('./routes/index');

var urlEncoder = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/static',express.static(path.join(__dirname, 'static')));

con.connect((err)=>{
    if(err){throw err;}
    console.log('Connected successfuly to MYSQL db');
 });

app.listen('3000',()=>{
    console.log('server started at 3000');
})

module.exports=app