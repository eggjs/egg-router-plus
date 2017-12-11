'use strict';

const mock = require('egg-mock');

describe.only('test/router-dir.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'dir',
    });
    return app.ready();
  });

  beforeEach(() => app.mockCsrf());
  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /sub', () => {
    return app.httpRequest()
      .get('/sub')
      .expect('hi, egg')
      .expect(200);
  });

  it('should GET /user/other', () => {
    return app.httpRequest()
      .get('/user/other')
      .expect('hi, egg')
      .expect(200);
  });
});
