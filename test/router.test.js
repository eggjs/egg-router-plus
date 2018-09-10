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
      .expect('foo', 'bar')
      .expect(200);
  });

  it('should not cache router', () => {
    const router1 = app.router.namespace('/test', (ctx, next) => next());
    const router2 = app.router.namespace('/test');
    assert(router1 !== router2);
  });

  it('dont support regex prefix', () => {
    try {
      app.router.namespace(/^test\/.*/);
      throw 'should not run here';
    } catch (err) {
      assert(err.message.includes('only support prefix with string'));
    }
  });

  it('dont support regex path', () => {
    try {
      const router = app.router.namespace('/test');
      router.get('name', /(\d+)/, app.controller.home.index);
      throw 'should not run here';
    } catch (err) {
      assert(err.message.includes('only support path with string'));
    }
  });

  describe('sub', () => {
    it('should exec after config.middleware', () => {
      return app.httpRequest()
        .get('/sub/get')
        .expect('sub get')
        .expect('foo', 'bar')
        .expect(200);
    });

    it('should GET /sub/get', () => {
      return app.httpRequest()
        .get('/sub/get')
        .expect('sub get')
        .expect(200);
    });

    it('should GET /sub/get/123', () => {
      return app.httpRequest()
        .get('/sub/get/123')
        .expect({ id: '123' })
        .expect(200);
    });

    it('should redirect /sub/go', () => {
      return app.httpRequest()
        .get('/sub/go')
        .expect(301)
        .expect('location', '/sub/get');
    });

    it('should redirect to name router', () => {
      return app.httpRequest()
        .get('/sub/go_name')
        .expect(301)
        .expect('location', '/sub/name');
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

    it('should GET /admin/get2', () => {
      return app.httpRequest()
        .get('/admin/get2')
        .expect('admin get')
        .expect('x-router', 'admin2')
        .expect(200);
    });

    it('should POST /admin/post2', () => {
      return app.httpRequest()
        .post('/admin/post2')
        .expect('admin post')
        .expect('x-router', 'admin2')
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

  describe('chaining', () => {
    it('should GET /chaining/get', () => {
      return app.httpRequest()
        .get('/chaining/get')
        .expect('sub get')
        .expect(200);
    });

    it('should POST /chaining/post', () => {
      return app.httpRequest()
        .post('/chaining/post')
        .expect('sub post')
        .expect(200);
    });

    it('should PUT /chaining/put', () => {
      return app.httpRequest()
        .put('/chaining/put')
        .expect('sub put')
        .expect(200);
    });

    it('should DELETE /chaining/delete', () => {
      return app.httpRequest()
        .delete('/chaining/delete')
        .expect('x-result', 'sub del')
        .expect(200);
    });

    it('should DELETE /chaining/del', () => {
      return app.httpRequest()
        .delete('/chaining/del')
        .expect('x-result', 'sub del')
        .expect(200);
    });

    it('should OPTIONS /chaining/options', () => {
      return app.httpRequest()
        .options('/chaining/options')
        .expect('x-result', 'sub options')
        .expect(200);
    });

    it('should PATCH /chaining/patch', () => {
      return app.httpRequest()
        .patch('/chaining/patch')
        .expect('x-result', 'sub patch')
        .expect(200);
    });

    it('should HEAD /chaining/head', () => {
      return app.httpRequest()
        .head('/chaining/head')
        .expect('x-result', 'sub head')
        .expect(200);
    });
  });
});
