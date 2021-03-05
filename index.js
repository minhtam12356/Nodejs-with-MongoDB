require('dotenv').config()

var express = require('express');
var app = express();
var morgan = require('morgan');
var cors = require('cors');

var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, function (err) {
  if (err) 
    throw err;
  console.log('Successfully connected');
})

var logger = require('logger').createLogger(); // logs to STDOUT
var logger = require('logger').createLogger('development.log'); // logs to a file

var UserRouter = require('./route/user.route');
var LoginRouter = require('./route/login.route');
var CreateRouter = require('./route/create.route');
var ProductRouter = require('./route/product.route');
var CartRouter = require('./route/cart.route');

//api
var ApiProduct = require('./api/route/product.route');
var ApiUser = require('./api/route/user.route');

var middleware = require('./middleware/login.middleware');
var auth = require('./middleware/auth.middleware');
 
var port = process.env.PORT || 3001;

var userModel = require('./models/user.model');

var cookieParser = require('cookie-parser');
const sessionMiddleware = require('./middleware/session.middleware');
app.use(cookieParser('secret'))

app.use(morgan('combined'))
app.use(cors());

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

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

// api
app.use('/api/product', ApiProduct);
app.use('/api/user', auth.auth, ApiUser);

app.listen(port, function(){
    console.log(`Server listening on port ${port}`)
})
app.use((req, res, next) => {
  try {
    var sniff_data = {}
    sniff_data.host = req.headers && req.headers.host
    sniff_data.url = req.url
    sniff_data.method = req.method
    sniff_data.user_agent = req.headers && req.headers['user-agent']
    sniff_data.ip_address = {}

    if (req.connection && req.connection.socket && req.connection.socket.remoteAddress) {
      sniff_data.ip_address.ip = sniff_data.ip_address.socketRemoteAddress = req.connection.socket.remoteAddress
    }
    if (req.socket && req.socket.remoteAddress) {
      sniff_data.ip_address.ip = sniff_data.ip_address.remoteAddress = req.socket.remoteAddress
    }
    if (req.connection && req.connection.remoteAddress) {
      sniff_data.ip_address.ip = sniff_data.ip_address.remoteAddress = req.connection.remoteAddress
    }
    if (req.headers['x-forwarded-for']) {
      sniff_data.ip_address.ip = sniff_data.ip_address['x-forwarded-for'] = req.headers['x-forwarded-for']
    }
    logger.info('SNIFF', JSON.stringify(sniff_data))

    next()
  } catch (err) {
    logger.error('Fatal', JSON.stringify(err.stack))
    res.status(500).json( {'error': 'INTERNAL_SERVER_ERROR'} )
  }
})