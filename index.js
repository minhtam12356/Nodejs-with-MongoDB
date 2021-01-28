require('dotenv').config()

var express = require('express');
var app = express();
var mongoose = require('mongoose');
mongoose.connect(process.env.SESSION_DATABASE_USER, function (err) {
  if (err) 
    throw err;
  console.log('Successfully connected');
})

var UserRouter = require('./route/user.route');
var LoginRouter = require('./route/login.route');
var CreateRouter = require('./route/create.route');
var ProductRouter = require('./route/product.route');
var CartRouter = require('./route/cart.route');

var middleware = require('./middleware/login.middleware');
 
var port = 3001;

var userModel = require('./models/user.model');

var cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middleware/session.middleware');
app.use(cookieParser('secret'))

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

  //home
app.get('/home', middleware.postLogin, async function(req, res){
  var user = await userModel.findOne({_id: req.signedCookies.userCookie})
  if(user){
    res.render('home', {name: user.name});
  } 
})

app.use('/', middleware.product, ProductRouter);
app.use('/create', CreateRouter);
app.use('/user', sessionMiddleware, middleware.postLogin, UserRouter);
app.use('/login', LoginRouter);
app.use('/cart', sessionMiddleware, CartRouter);

app.listen(port, function(){
    console.log(`Server listening on port ${port}`)
})