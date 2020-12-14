var express = require('express');
var router = express.Router();
const User = require('./../models/user')
const {jwtService} = require("../jwtservice/jwt-token");
/* GET users listing. */
router.get('/', (req, res) => {
  User.find().then((user) => {
    res.json(user);
  }).catch(err => res.status(400).res.json(`Error:${err}`))
});
/**Login */
router.post('/login', async (req, res) => {
  const {email, password} = req.body;
  let resp = await User.findOne({email: email, password: password});
  if (resp) {
    console.log('resp', resp);
    // let token = await jwtService.generateJwt({id: resp._id});
    // console.log('token', token);
    res.status(200).send({'message': 'Success'});
  } else {
    res.status(404).send({'message': 'Invalid details'})
  }
});

module.exports = router;
