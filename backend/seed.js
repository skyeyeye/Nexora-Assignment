require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mock-ecom';

const products = [
  { name: 'Vibe T-shirt', price: 499, description: 'Comfort tee' },
  { name: 'Vibe Cap', price: 299, description: 'Adjustable snapback' },
  { name: 'Wireless Earbuds', price: 1999, description: 'Mock wireless buds' },
  { name: 'Vibe Mug', price: 199, description: 'Ceramic mug' },
  { name: 'Sticker Pack', price: 99, description: '5 stickers' },
  { name: 'Phone Case', price: 599, description: 'Shockproof case' }
];

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('Connected to DB. Seeding products...');
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log('Seeding complete.');
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
