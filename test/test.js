const assert = require('assert');
const request = require('supertest');
const app = require('../');

describe('GET /', () => {

  it('should return a 200 status code', (done) => {
    request(app)
      .get('/')
      .expect(200, done);
  });
});

describe('GET /urls', () => {

  beforeEach(() => {
    app.locals.db.urls.data = [{"id":"HkrRLh2Ge","longUrl":"https://www.google.com/"}];
  });

  afterEach(() => {
    app.locals.db.urls.data = [];
  });

  it('should return a 200 status code', (done) => {
    request(app)
      .get('/urls')
      .expect(200, done);
  });

  it('should return a set urls stored in app.locals.db.urls', (done) => {
    request(app)
      .get('/urls')
      .expect(200, {
        urls: app.locals.db.urls.data
      }, done);
  });
});

describe('GET /:id', () => {
  beforeEach(() => {
    this.url = {"id":"HkrRLh2Ge","longUrl":"https://www.google.com/"};
    app.locals.db.urls.data = [this.url];
  });

  afterEach(() => {
    app.locals.db.urls.data = [];
  });

  it('should redirect when requesting with the provided id', (done) => {

    request(app)
      .get(`/${this.url.id}`)
      .expect(301, done);
  });
});

describe('GET /:id', () => {
  beforeEach(() => {
    this.url = {"id":"HkrRLh2Ge"};
    app.locals.db.urls.data = [this.url];
  });

  afterEach(() => {
    app.locals.db.urls.data = [];
  });

  it('should return a 404 if the longUrl is not valid', (done) => {
    request(app)
      .get(`/${this.url.id}`)
        .expect(404, done);
  });
});
