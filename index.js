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
// We also need an uploader for images, and an uploads folder
const uploads = multer({ dest: './uploads' });

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

// home page
app.get('/', (req, res) => {
    res.redirect('/images');
});

// Add a new image
app.get('/images/new' , (req, res) => {
    res.render('new');
});

app.get('/images', (req, res) => {
    let image = { url: '' };
    res.render('index', { image });
});

// POST

// uploads.single uploads one single file for use, 
// from this we can upload the file to cloudbinary.
app.post('/images', uploads.single('inputFile'), (req, res) => {
    const image = req.file.path;
    console.log(image);

    cloudinary.uploader.upload(image, (result) => {
        console.log(result); // will be an object
        let image = { secure_url: result.secure_url }
        res.render('index', { image });
    })
});


// LISTENERS
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));