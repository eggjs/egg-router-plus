'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/router.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'example',
    });
    return app.ready();
  });

  beforeEach(() => app.mockCsrf());
  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, egg')
      .expect(200);
  });

  describe('sub', () => {
    it('should GET /sub/get', () => {
      return app.httpRequest()
        .get('/sub/get')
        .expect('sub get')
        .expect(200);
    });

    it('should GET /sub/get/123', () => {
      return app.httpRequest()
        .get('/sub/get/123')
        .expect({ id: 123 })
        .expect(200);
    });

    it.skip('should redirect /sub/go', () => {
      return app.httpRequest()
        .head('/sub/go')
        .expect(301)
        .expect('location', '/sub/get');
    });

    it('should POST /sub/post', () => {
      return app.httpRequest()
        .post('/sub/post')
        .expect('sub post')
        .expect(200);
    });

    it('should PUT /sub/put', () => {
      return app.httpRequest()
        .put('/sub/put')
        .expect('sub put')
        .expect(200);
    });

    it('should OPTIONS /sub/options', () => {
      return app.httpRequest()
        .options('/sub/options')
        .expect('x-result', 'sub options')
        .expect(200);
    });

    it('should PATCH /sub/patch', () => {
      return app.httpRequest()
        .patch('/sub/patch')
        .expect('x-result', 'sub patch')
        .expect(200);
    });

    it('should DELETE /sub/del', () => {
      return app.httpRequest()
        .delete('/sub/del')
        .expect('x-result', 'sub del')
        .expect(200);
    });

    it('should DELETE /sub/delete', () => {
      return app.httpRequest()
        .delete('/sub/delete')
        .expect('x-result', 'sub del')
        .expect(200);
    });
  });

  describe('all', () => {
    it('should GET /all/test', () => {
      return app.httpRequest()
        .get('/all/test')
        .expect('x-result', 'all')
        .expect(200);
    });

    it('should POST /all/test', () => {
      return app.httpRequest()
        .post('/all/test')
        .expect('x-result', 'all')
        .expect(200);
    });

    it('should PUT /all/test', () => {
      return app.httpRequest()
        .put('/all/test')
        .expect('x-result', 'all')
        .expect(200);
    });

    it('should DELETE /all/test', () => {
      return app.httpRequest()
        .delete('/all/test')
        .expect('x-result', 'all')
        .expect(200);
    });
  });

  describe('middleware', () => {
    it('should GET /admin/get', () => {
      return app.httpRequest()
        .get('/admin/get')
        .expect('admin get')
        .expect('x-router', 'admin')
        .expect(200);
    });

    it('should POST /admin/post', () => {
      return app.httpRequest()
        .post('/admin/post')
        .expect('admin post')
        .expect('x-router', 'admin')
        .expect(200);
    });
  });

  describe('name', () => {
    it('should url()', () => {
      assert(app.url('name_get') === '/name/get');
      assert(app.url('name_post') === '/name/post');
    });

    it('should GET /name/get', () => {
      return app.httpRequest()
        .get('/name/get')
        .expect('admin get')
        .expect('x-router', 'name')
        .expect(200);
    });

    it('should POST /name/post', () => {
      return app.httpRequest()
        .post('/name/post')
        .expect('admin post')
        .expect('x-router', 'name')
        .expect(200);
    });
  });

  describe('resource', () => {
    it('should url()', () => {
      assert(app.url('posts') === '/api/posts');
      assert(app.url('post') === '/api/posts/:id');
    });

    it('should GET /api/posts', () => {
      return app.httpRequest()
        .get('/api/posts')
        .expect('post index')
        .expect('x-router', 'posts')
        .expect(200);
    });

    it('should GET /api/posts/123', () => {
      return app.httpRequest()
        .get('/api/posts/123')
        .expect('post 123')
        .expect('x-router', 'posts')
        .expect(200);
    });
  });

});
