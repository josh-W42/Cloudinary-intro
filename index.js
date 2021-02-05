// Env
require('dotenv').config();
// Express
const express = require('express');
const app = express();
// EJS
const ejsLayouts = require('express-ejs-layouts');
// Multer NEW
const multer = require('multer');
// Cloudinary NEW
const cloudinary = require('cloudinary');

// MIDDLEWARE
//Ejs
app.set('view engine', 'ejs');
// express-layouts
app.use(ejsLayouts);
// body parser
app.use(express.urlencoded({ extended: false }));
// For console logging
app.use(require('morgan')('dev'));

// ROUTES
app.get('/', (req, res) => {
    res.send(`I'm working`);
});

// LISTENERS
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));