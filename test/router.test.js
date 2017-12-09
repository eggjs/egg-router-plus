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

    it('should POST /sub/post', () => {
      app.mockCsrf();
      return app.httpRequest()
        .post('/sub/post')
        .expect('sub post')
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
      app.mockCsrf();
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
      app.mockCsrf();
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
