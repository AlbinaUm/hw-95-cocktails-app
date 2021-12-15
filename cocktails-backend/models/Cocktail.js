const mongoose = require('mongoose');

const IngredientSchema = new mongoose.Schema({
  title: String,
  amount: String,
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
  image: String,
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