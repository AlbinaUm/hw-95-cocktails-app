const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
});

const CocktailSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true,
  },
  recipe: {
    type: String,
    required: true,
  },
  published: {
    type: Boolean,
    default: false
  },
  ingredients: [IngredientSchema],
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;