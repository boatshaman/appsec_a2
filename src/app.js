const express = require('express');
const PORT = 8080;
const HOST = '0.0.0.0';
const app = express();

app.set('view engine', 'hbs');
app.set('view options', { layout: 'layout.hbs' });

app.get('/', (req, res) => {
  res.render('index', {})
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
