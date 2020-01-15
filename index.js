const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();
const dotenv = require('dotenv')

dotenv.config()

const password = process.env.DB_PASS


mongoose.connect(`mongodb+srv://dino:${password}@cluster0-c4ci4.mongodb.net/test?retryWrites=true&w=majority`)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));