const express = require("express");
var path = require("path");
const app = express();
var session = require('express-session');
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
const server = app.listen(8000);
const io = require('socket.io')(server);
var color= "white"; 
var id =0;
var history=[];
app.use(session({
    secret:'id',
    resave:false,
    saveUninitialized:true,
    cookie: {maxAge: 60000}
}))
io.on('connection', function(socket){
    socket.on('new_message', function(data){
        history.push({name: data.name, message: data.message});
        io.emit('create_message', {name:data.name, message:data.message});
    })
    socket.emit('historyfill',history)
 })

app.get('/login', function(req,res){
    res.render('login')
})
app.get('/', function(req,res){
    res.render('index');
})


