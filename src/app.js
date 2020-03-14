const express = require('express');
const fileUpload = require('express-fileupload');
const fs = require('fs');
const { exec } = require("child_process");
const PORT = 8080;
const HOST = '0.0.0.0';
const IMAGE_DIRECTORY = '/tmp/tmp/';
const MOD_IMAGE_DIRECTORY = `${IMAGE_DIRECTORY}resized/`;
const app = express();

app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout.hbs' });
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : IMAGE_DIRECTORY
}));

app.get('/', (req, res) => {
  fs.readdir(MOD_IMAGE_DIRECTORY, function (err, files) {
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }
    res.render('index', {images:files, imageDir:MOD_IMAGE_DIRECTORY});
  });
});

app.get('/download-image', (req, res) => {
  res.download(`${req.query.dir}${req.query.file}`, req.query.file, (err) => {
    if (err)
      console.log("ERROR: Sending image");
  });
});

app.post('/upload-image', function(req, res) {
  // req.body.filename = filename
  // req.body.image = image
  let filename = req.body.filename && req.body.filename !== '' ? req.body.filename : req.files.image.name;
  exec(`./src/image_resize.py ${req.files.image.tempFilePath} ${MOD_IMAGE_DIRECTORY}${filename}`, (error, stdout, stderr) => {
    if (error) {
        console.log(`error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
  });
  res.render('upload', {filename: filename});
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
