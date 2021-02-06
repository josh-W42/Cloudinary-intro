# Cloudinary-intro
A personal reference of how to use cloudinary to store img or video files

## Background:
- We've explored how to store data (like strings) in a database using sequalize ORM.
- Now we're looking at how we can use a third-party database (cloudinary) to store image and video data.

## What's new:

Just going to cover what's new that we need to run cloudinary.
### We're using Cloudinary and Multer:
```
npm i cloudinary multer
```
Also require them in index.js
```js
const cloudinary = require('cloudinary');
const multer = require('multer');
```

Then create an uploader and modify a post method to use it.
```js
const uploads = multer({ dest: './uploads' });
// other middleware and routes

app.post('route', uploads.single('nameOfinputFromForm'), (req, res) => {
    const image = req.file.path;
    cloudinary.uploader.upload(image, (result) => {
        /* 
            Here result is an object with data that you
            can use to store the url of the image hosted on cloudbinary.
        */

        // Just to show some thing on the page after submitting.
        let image = { secure_url: result.secure_url }
        res.render('route', { image });
    });
});
```

### Cloudinary Api key required:
- Store your api key in your .env file.
```
CLOUDINARY_URL=YOUR_INFO
```
- Don't forget to add your .env file to .gitignore!


### Form data needed for adding a file:

- You have to include this property to send images.
```html
<form action="route" method="POST" enctype="multipart/form-data">
<!-- Form data -->
</form>
```
- I believe this is because images are transported across the web in various binary packets in case they are large. (Double checking that later)


