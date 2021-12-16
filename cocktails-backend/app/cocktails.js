const express = require('express');
const multer = require('multer');
const path = require('path');
const {nanoid} = require('nanoid');
const config = require('../config');
const auth = require("../middleware/auth");
const Cocktail = require("../models/Cocktail");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({storage});

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    let cocktails = [];
    const query = {};

    if (req.query.user){
        query.user = req.query.user;
        cocktails = await Cocktail.find(query).populate('user');
    } else {

        if(req.user.role === 'admin') {
          cocktails = await Cocktail.find().populate('user');
        } else {
          cocktails = await Cocktail.find({published: true}).populate('user');
        }
    }

    res.send(cocktails);
  } catch (e){
    res.sendStatus(500);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const cocktail = await Cocktail.findById(req.params.id).populate('user');

    if (cocktail) {
      res.send(cocktail);
    } else {
      res.status(404).send({error: 'Cocktail not found'});
    }
  } catch {
    res.sendStatus(500);
  }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
  try {
    const cocktailData = {
      user: req.user._id,
      title: req.body.title,
      recipe: req.body.recipe,
      ingredients: JSON.parse(req.body.ingredients),
    };

    if (req.file) {
      cocktailData.image = 'uploads/' + req.file.filename;
    } else {
      cocktailData.image = null;
    }

    const cocktail = new Cocktail(cocktailData);

    await cocktail.save();
    res.send(cocktail);
  } catch (error) {
    res.status(400).send(error);
  }
});

module.exports = router;