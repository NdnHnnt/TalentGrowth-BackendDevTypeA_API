require('dotenv').config();
const express = require('express');
const app = express();
const contactRoutes = require('./routes/contact');

app.use(express.json());

app.use('/contact', contactRoutes);
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

module.exports = app;