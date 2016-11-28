const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const shortid = require('shortid');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.locals.urls = {};

//shortid.generate();

app.get('/api/urls/:id', (request, response) => {
  const { id } = request.params;
  const longUrl = app.locals.urls[id];

  if(!longUrl) { return response.sendStatus(404); }

  response.json({ id, longUrl });
})

app.post('/api/urls', (request, response) => {
  const { longUrl } = request.body;
  const id = shortid.generate();

  if (!longUrl) {
    return response.status(422).send({
      error: 'No url provided'
    });
  }

  app.locals.urls[id] = longUrl;

  response.json({ id, longUrl });
});

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Tinyify';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} now listening on 3000`);
});

//get a long url -> create an object with the name of the TINY url ->
