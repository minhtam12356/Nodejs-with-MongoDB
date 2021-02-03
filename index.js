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
var ApiProduct = require('./api/route/product.route');

var middleware = require('./middleware/login.middleware');
 
var port = process.env.PORT || 3001;

var userModel = require('./models/user.model');

var cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middleware/session.middleware');
app.use(cookieParser('secret'))

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use('/api/product', ApiProduct);
app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.static('public'));

  //home
app.get('/home', middleware.postLogin, async function(req, res){
  try {
    var user = await userModel.findOne({_id: req.signedCookies.userCookie})
    res.render('home', {name: user.name});
  } catch (error) {
    console.log('error:', error)
  }
  
})

app.use('/', middleware.product, ProductRouter);
app.use('/create', CreateRouter);
app.use('/user', sessionMiddleware, middleware.postLogin, UserRouter);
app.use('/login', LoginRouter);
app.use('/cart', sessionMiddleware, CartRouter);
app.use('/api/product', ApiProduct);

app.listen(port, function(){
    console.log(`Server listening on port ${port}`)
})