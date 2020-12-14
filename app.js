var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var blogRouter = require('./routes/blogs');
var commentRouter = require('./routes/comments');
var replyRouter = require('./routes/replies');
var cors = require('cors');
var app = express();
const {writeFileSync} = require('fs');
const {generateKeyPairSync, createCipheriv} = require('crypto')
var myLogger = function (req, res, next) {
  console.log('Using Morgan for logging')
  next()
}
var port = process.env.PORT || '5000';
require('dotenv').config();
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true, dbName: "mern_blog"}).then(
  (data) => { /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */
    console.log('DB connected succesfully');
  },
  err => { /** handle initial connection error */
    console.log('error while connecting to db', err);
  }
);
app.use(myLogger);
app.use(cors());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', port);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/blog', blogRouter)
app.use('/api/v1/comment', commentRouter)
app.use('/api/v1/reply', replyRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
//serving frontend
if (process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'sqa') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/build', index.html));
  })
}
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(port, (req, res) => {
  console.log(`app is listening to PORT: ${port}`)
})

// function crypto1() {
//   console.log('hey there!');
//   const keyPair = generateKeyPairSync('rsa', {
//     modulusLength: 4096,
//     publicKeyEncoding: {
//       type: 'spki',
//       format: 'pem'
//     },
//     privateKeyEncoding: {
//       type: 'pkcs8',
//       format: 'pem',
//       cipher: 'aes-256-cbc',
//       passphrase: 'top secret'
//     }
//   });
//   console.log(keyPair);

//   function encrypt(data) {
//     let cipher = createCipheriv('aes-256-ecb', 'pass');
//     cipher.update(data, 'utf8');
//     return cipher.final('hex');
//   }


//   // This is working
//   console.log(encrypt('asa'));

//   // Getting error - 'generateKeyPairSync is not a function'
//   generate_keys();
// }
// crypto1();
module.exports = app;
