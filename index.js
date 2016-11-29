const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');
const fs = require('fs');

app.use(express.static('lib'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Tinyify';
app.locals.urls = {};

app.get('/', (request, response) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    response.send(file);
  });
});

app.get('/:id', (request, response) => {
  const { id } = request.params;
  const longUrl = app.locals.urls[id];

  if(!longUrl) { return response.sendStatus(404); }

  response.redirect(301, longUrl);
});

app.post('/urls', (request, response) => {
  const { longUrl } = request.body;
  const id = shortid.generate();
  app.locals.urls[id] = longUrl;

  if (!longUrl) {
    return response.status(422).send({
      error: 'No url provided'
    });
  }

  response.json({ id, longUrl });
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} now listening on 3000`);
});
