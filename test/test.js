const assert = require('assert');
const request = require('supertest');
const app = require('../');

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
