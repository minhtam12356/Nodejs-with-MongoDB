require('dotenv').config()
const port = process.env.PORT || 3001;
const express = require('express');
const app = express();

//===TEMPLATE ENGINE - PUG===
app.set('view engine', 'pug');
app.set('views', './views');
//===STATIC FILE===
app.use(express.static('public'));

//const morgan = require('morgan');
const cors = require('cors');
var server = require('http').Server(app);
var io = require('socket.io')(server);

//===SOCKET.IO===
io.on("connection", function(socket){
  console.log('CO KET NOI', socket.id);
})

const cookieParser = require('cookie-parser');
const userModel = require('./models/user.model');
const mongoose = require('mongoose');

// show ip client
//var logger = require('logger').createLogger(); // logs to STDOUT
//var logger = require('logger').createLogger('development.log'); // logs to a file

// connect mongoDB
mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true, useUnifiedTopology: true }, function (err) {
  if (err) 
    throw err;
  console.log('Successfully connected');
})

app.use(cookieParser('secret'))
//app.use(morgan('combined'))
app.use(cors());

//===BODY-PARSER===
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//===ROUTE===
const UserRouter = require('./route/user.route');
const LoginRouter = require('./route/login.route');
const CreateRouter = require('./route/create.route');
const ProductRouter = require('./route/product.route');
const CartRouter = require('./route/cart.route');

//===MIDDLEWARE===
const sessionMiddleware = require('./middleware/session.middleware');
const middleware = require('./middleware/login.middleware');
const auth = require('./middleware/auth.middleware');

//===API===
const ApiProduct = require('./api/route/product.route');
const ApiUser = require('./api/route/user.route');

//HOME
app.get('/home', middleware.postLogin, async function(req, res){
  try {
    const user = await userModel.findOne({_id: req.signedCookies.userCookie})
    res.render('home', {name: user.name});
  } catch (error) {
    console.log('error:', error)
  } 
})

//SERVER
app.use('/', ProductRouter);
app.use('/create', CreateRouter);
app.use('/user', middleware.postLogin, sessionMiddleware,  UserRouter);
app.use('/login', LoginRouter);
app.use('/cart', middleware.postLogin, sessionMiddleware, CartRouter);

//API
app.use('/api/product', ApiProduct);
app.use('/api/user', auth.auth, ApiUser);

//===LISTEN PORT===
app.listen(port, function(){
    console.log(`Server listening on port ${port}`)
})



//===SHOW IP CLIENT===
//app.use((req, res, next) => {
//   try {
//     const sniff_data = {}
//     sniff_data.host = req.headers && req.headers.host
//     sniff_data.url = req.url
//     sniff_data.method = req.method
//     sniff_data.user_agent = req.headers && req.headers['user-agent']
//     sniff_data.ip_address = {}

//     if (req.connection && req.connection.socket && req.connection.socket.remoteAddress) {
//       sniff_data.ip_address.ip = sniff_data.ip_address.socketRemoteAddress = req.connection.socket.remoteAddress
//     }
//     if (req.socket && req.socket.remoteAddress) {
//       sniff_data.ip_address.ip = sniff_data.ip_address.remoteAddress = req.socket.remoteAddress
//     }
//     if (req.connection && req.connection.remoteAddress) {
//       sniff_data.ip_address.ip = sniff_data.ip_address.remoteAddress = req.connection.remoteAddress
//     }
//     if (req.headers['x-forwarded-for']) {
//       sniff_data.ip_address.ip = sniff_data.ip_address['x-forwarded-for'] = req.headers['x-forwarded-for']
//     }
//     logger.info('SNIFF', JSON.stringify(sniff_data))

//     next()
//   } catch (err) {
//     logger.error('Fatal', JSON.stringify(err.stack))
//     res.status(500).json( {'error': 'INTERNAL_SERVER_ERROR'} )
//   }
// })