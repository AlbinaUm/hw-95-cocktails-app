const mongoose = require('mongoose');
const config = require('./config');
const {nanoid} = require("nanoid");
const User = require("./models/User");
const Cocktail = require("./models/Cocktail");

const run = async () => {
  await mongoose.connect(config.db.url);

  const collections = await mongoose.connection.db.listCollections().toArray();

  for (const coll of collections) {
    await mongoose.connection.db.dropCollection(coll.name);
  }

  const [userAlbina, userAdmin] = await User.create({
    email: 'albina@gmail.com',
    displayName: 'Albina',
    avatar: 'fixtures/albina.jpg',
    password: '123',
    token: nanoid(),
    role: 'user',
  }, {
    email: 'admin@gmail.com',
    displayName: 'John Doe',
    avatar: 'fixtures/admin.jpg',
    password: '123',
    token: nanoid(),
    role: 'admin',
  });

  await Cocktail.create({
      user:  userAlbina._id,
      title: 'New Year on Fire',
      image: 'fixtures/cocktail1.png',
      recipe: 'Add the mint leaves, lime juice and simple syrup into a Collins glass and press gently with a muddler.' +
        'Add scotch and fill with crushed ice.Float Campari on top and fill with more crushed ice.Garnish with a flaming ' +
        'lime shell*.',
      published: true,
      ingredients: [
        {title: "Mint", amount: "6 leaves", id: nanoid()},
        {title: "Lime juice", amount: "3/4 ounce", id: nanoid()},
        {title: "Bowmore 12-year-old single malt scotch", amount: "2 ounces ", id: nanoid()},
        {title: "Campari", amount: "1/2 ounce", id: nanoid()},
        {title: "Simple syrup", amount: "1/2 ounce", id: nanoid()}
      ],
  }, {
      user:  userAdmin._id,
      title: 'Cunningham',
      image: 'fixtures/cocktail2.png',
      recipe: 'Add the whisky, liqueurs and fruit juices into a shaker with ice and shake until well-chilled. Strain ' +
        'into a chilled cocktail glass.Garnish a brandied cherry and a flamed blood orange twist.',
      published: true,
      ingredients: [
        {title: "The Famous Grouse scotch", amount: "11/2 ounces", id: nanoid()},
        {title: "Benedictine", amount: "1/4 ounce", id: nanoid()},
        {title: "Heering cherry liqueur", amount: "1/4 ounce", id: nanoid()},
        {title: "Blood orange juice, freshly squeezed", amount: "1/2 ounce ", id: nanoid()},
        {title: "Lemon juice, freshly squeezed", amount: "1/2 ounce ", id: nanoid()},
        {title: "Brandied cherry", amount: "Garnish", id: nanoid()},
        {title: "Flamed blood orange twist", amount: "Garnish", id: nanoid()},
      ],
  }, {
      user:  userAdmin._id,
      title: 'Bright Lights',
      image: 'fixtures/cocktail3.png',
      recipe: 'Add the tequila, sotol, verjus, syrup and bitters into a mixing glass with ice and stir until' +
        ' well-chilled. Strain into a rocks glass over fresh ice.Garnish with an orange twist and a grapefruit ' +
        'twist. *Rosé cava syrup: Add 3 cups rosé cava and 1 cup raw acacia honey into a pot over low heat and ' +
        'stir until honey is dissolved. Remove from heat and allow to cool before using. Will keep, tightly ' +
        'covered and refrigerated, for up to 1 month.',
      published: true,
      ingredients: [
        {title: "Blanco tequila (such as Siete Leguas)", amount: "1 ounce", id: nanoid()},
        {title: "Sotol Por Siempre", amount: "1/2 ounce", id: nanoid()},
        {title: "Verjus (such as Wolffer)", amount: "1/2 ounce", id: nanoid()},
        {title: "Rosé cava syrup*", amount: "1/2 ounce", id: nanoid()},
        {title: "Celery bitters (such as Bittermens celery shrub)", amount: "1 dash", id: nanoid()},
        {title: "Orange twist", amount: "Garnish", id: nanoid()},
        {title: "Grapefruit twist", amount: "Garnish", id: nanoid()},
      ],
  }, {
      user:  userAlbina._id,
      title: 'Margarita',
      image: 'fixtures/cocktail4.png',
      recipe: 'Add tequila, orange liqueur, lime juice and agave syrup to a cocktail shaker filled with ice, ' +
        'and shake until well-chilled.Strain into a rocks glass over fresh ice.Garnish with a lime wheel and' +
        ' kosher salt rim (optional).',
      published: true,
      ingredients: [
        {title: "Blanco tequila", amount: "2 ounce", id: nanoid()},
        {title: "Orange liqueur", amount: "1/2 ounce", id: nanoid()},
        {title: "Lime juice, freshly squeezed", amount: "1 ounce", id: nanoid()},
        {title: "Agave syrup", amount: "1/2 ounce", id: nanoid()},
        {title: "Lime wheel", amount: "Garnish", id: nanoid()},
        {title: "Kosher salt (optional)", amount: "Garnish", id: nanoid()},
      ],
  },{
    user:  userAlbina._id,
    title: 'Forefathers',
    image: 'fixtures/cocktail5.png',
    recipe: 'Add the bourbon, sweet tea oleo saccharum and bitters into a mixing glass with ice and stir ' +
      'until well-chilled.Strain into an Old Fashioned glass over a 2-inch ice cube. Garnish with an orange ' +
      'peel. *Sweet tea oleo saccharum: Peel 4 lemons and 2 oranges. Transfer the peels to a sealed bag and ' +
      'add 2 cups sugar. Toss peels and sugar to coat. Press bag to remove all air and seal to close. Let bag' +
      ' sit at room temperature for 24-48 hours until the citrus’ oils have dissolved the sugar. Open bag and' +
      ' pour mixture and into a saucepan. Add 1 1/2 cups unsweetened, chilled Red Diamond tea. Cook over medium-low ' +
      'heat for 10-15 minutes until sugar dissolves into tea and syrup forms. Pour mixture through strainer to' +
      ' remove peels. Cool and reserve until ready to use',
    published: false,
    ingredients: [
      {title: "Evan Williams 1783 bourbon", amount: "2 ounces ", id: nanoid()},
      {title: "Sweet tea oleo saccharum*", amount: "2 teaspoons", id: nanoid()},
      {title: "Fee Brothers peach bitters", amount: "3 dashes ", id: nanoid()},
      {title: "Orange peel", amount: "Garnish", id: nanoid()},
    ],
  });

  await mongoose.connection.close();
};

run().catch(console.error);