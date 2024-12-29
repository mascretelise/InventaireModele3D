
const express = require('express');
const AWS = require('aws-sdk');

const {
    S3,
} = require('@aws-sdk/client-s3');

require('dotenv').config();
const multer = require('multer');
const multerS3 = require('multer-s3');
const app = express();
const port = 3000;



AWS.config.update({
    region: process.env.AWS_REGION,
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY
});

const s3 = new AWS.S3();

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.AWS_BUCKET_NAME,
        key: function (req, file, cb){
            cb(null, ''+ file.originalname);
        },
    }),
});

// Serve HTML form for file upload
app.get('/', (req, res) => {
    res.sendFile(__dirname );
  });

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  res.send('File uploaded successfully!');
});


// Lancer le serveur
app.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`);
});
