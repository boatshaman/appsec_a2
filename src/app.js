const express = require('express');
const fileUpload = require('express-fileupload');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout.hbs' });
app.use(fileUpload());

app.get('/', (req, res) => {
  res.render('index', {});
});

app.post('/upload', function(req, res) {
  req.files.image.mv(`/tmp/tmp/${req.files.image.name}`, function(err) {
    if (err)
      return res.status(500).send(err);
    res.render('upload', {filename: req.body.filename});
  });
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
