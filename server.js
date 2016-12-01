const express = require('express');
const bodyParser = require('body-parser');
const shortid = require('shortid');
const fs = require('fs');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
// const links = require('./routes/links');
let Link = require('./models/link');
// const express = require('express');
// const app = express.Router();
// const app = express();
// const bodyParser = require('body-parser');
// const shortid = require('shortid');
// const fs = require('fs');

const app = express();

var dbName = 'linksDB';
var connectionString = 'mongodb://localhost:27017/' + dbName;
//
mongoose.connect(connectionString);

app.use(express.static('views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/links', links)
// app.set('view engine', 'html');

let port_number = process.env.PORT || 3000;

app.locals.title = 'Tinyify';

app.get('/', (req, res) => {
  Link.find(function(err, links) {
    if (err) {
      res.send(err)
    }

    res.send(links)
    })
});
//
// app.post('/', function(req, res) {
//   var dinosaur = new Dinosaur(req.body);
//
//   dinosaur.save(function(err) {
//     if (err) {
//       res.send(err)
//     }
//     Dinosaur.find(function(err, dinos) {
//       res.render('index.ejs', {dinosaurs: dinos})
//     })
//   })
// })
//
// app.get('/:id', (request, response) => {
//
//   app.locals.db.urls.data = app.locals.db.urls.data.map( (url) => {
//     if (url.id === request.params.id){
//       url.clicks++;
//     }
//   });
//
//   let thisLink = app.locals.db.urls.data.find( (url) => {
//     return url.id === request.params.id;
//   });
//
//   if(!thisLink.longUrl) { return response.sendStatus(404); }
//
//   response.redirect(301, thisLink.longUrl);
// });

// app.post('/urls', (request, response) => {
//   const { longUrl } = request.body;
//   const id = shortid.generate();
//   const link = { id, longUrl, clicks: 0, timestamp: Date.now() };
//
//   if (!longUrl) {
//     return response.status(422).send({
//       error: 'No url provided'
//     });
//   }
//
//   response.json(app.locals.db.urls.data);
// });

app.get('/urls', function(req, res) {
  var link = new Link(req.body);

  link.save(function(err) {
    if (err) {
      res.send(err)
    }
    Link.find(function(err, links) {
      res.send(links)
    })
  })
})

app.post('/urls', function(req, res) {
  var link = new Link(req.body);

  link.save(function(err) {
    if (err) {
      res.send(err)
    }
    Link.find(function(err, links) {
      console.log(links)
    })
  })
})

// app.locals.db = {
//   urls: {
//     data: [
//       {id:"HkrRLh2Ge",longUrl:"https://www.google.com/", clicks: 5, timestamp: 1480556223476},
//       {id:"asdfjkl", longUrl:"http://frontend.turing.io", clicks: 11, timestamp: 1480556245673},
//       {id:"qwerty", longUrl:"http://www.nytimes.com", clicks: 6, timestamp: 1480556267588},
//     ]
//   }
// };

  app.listen(port_number, () => {
    console.log(`${app.locals.title} now listening on ${port_number}`);
  });

module.exports = app;
