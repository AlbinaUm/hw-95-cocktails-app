const express = require('express');
const config = require('../config');
const User = require('../models/User');
const {nanoid} = require("nanoid");
const axios = require("axios");

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (e){
    res.sendStatus(500);
  }
});

router.post('/sessions', async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  try {
    if (!user){
      return res.status(401).send({message: 'Credentials are wrong!'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(401).send({message: 'Credentials are wrong!'});
    }

    user.generateToken();
    await user.save({validateBeforeSave: false});
    res.send(user);

  } catch (error){
    res.status(400).send(error);
  }
});

router.post('/facebookLogin', async (req, res) => {
  const inputToken = req.body.accessToken;

  const accessToken = config.facebook.appId + '|' + config.facebook.appSecret; //undefined

  const debugTokenURl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

  try {
    const response = await axios.get(debugTokenURl);

    if (response.data.data.error){
      return res.status(401).send({global: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data.user_id){
      return res.status(401).send({global: 'Wrong User Id'});
    }

    let user = await User.findOne({email: req.body.email});

    if (!user) {
      user = await User.findOne({facebookId: req.body.id});
    }

    if (!user) {
      user = new User({
        email: req.body.email || nanoid() + '@gmail.com',
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name,
        avatar: req.body.picture.data.url,
      });
    }

    user.generateToken();
    user.save({validateBeforeSave: false});

    res.send({message: 'Success', user});
  } catch (e){
    res.status(401).send({global: 'Facebook token incorrect!'});
  }
});

router.delete('/sessions', async (req, res) => {
  const token = req.get('Authorization');
  const success = {message: 'Success'};

  if (!token) return res.send(success);

  const user = await User.findOne({token});

  if (!user) return res.send(success);

  user.generateToken();

  await user.save({validateBeforeSave: false});

  return res.send(success);
});

module.exports = router;