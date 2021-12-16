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

router.get('/', async (req, res) => {
  try {
    const cocktails = await Cocktail.find();

    res.send(cocktails);
  } catch (e){
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