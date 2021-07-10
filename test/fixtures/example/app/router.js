'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;

  router.get('/', controller.home.index);

  const allRouter = app.router.namespace('/all');
  allRouter.all('/test', controller.home.all);

  const subRouter = app.router.namespace('/sub');
  subRouter.get('/get', controller.sub.get);
  subRouter.post('/post', controller.sub.post);
  subRouter.put('/put', controller.sub.put);
  subRouter.delete('/delete', controller.sub.del);
  subRouter.del('/del', controller.sub.del);
  subRouter.options('/options', controller.sub.options);
  subRouter.patch('/patch', controller.sub.patch);

  subRouter.get('/get/:id', controller.sub.getParam);

  // only the first
  subRouter.redirect('/go', '/sub/get');

  subRouter.get('name_router', '/name', controller.sub.get);
  subRouter.redirect('/go_name', 'name_router');

  const adminRouter = app.router.namespace('/admin', middleware.test({ prefix: 'admin' }));
  adminRouter.get('/get', controller.admin.get);
  adminRouter.post('/post', controller.admin.post);

  const adminRouter2 = app.router.namespace('/admin', middleware.test({ prefix: 'admin2' }));
  adminRouter2.get('/get2', controller.admin.get);
  adminRouter2.post('/post2', controller.admin.post);

  const nameRouter = app.router.namespace('/name', middleware.test({ prefix: 'name' }));
  nameRouter.get('name_get', '/get', controller.admin.get);
  nameRouter.post('name_post', '/post', controller.admin.post);

  // resource
  const postRouter = app.router.namespace('/api', middleware.test({ prefix: 'posts' }));
  postRouter.resources('posts', '/posts', controller.posts);

  // chaining
  const chainingRouter = app.router.namespace('/chaining');
  chainingRouter
    .get('/get', controller.sub.get)
    .post('/post', controller.sub.post)
    .put('/put', controller.sub.put)
    .delete('/delete', controller.sub.del)
    .del('/del', controller.sub.del)
    .options('/options', controller.sub.options)
    .patch('/patch', controller.sub.patch)
    .head('/head', controller.sub.head);

  // override
  const overrideRouter = app.router.namespace('/override');
  const overrideWebRouter = app.router.namespace('/override/web');
  const overrideWebAdminRouter = app.router.namespace('/override/web/admin');
  overrideRouter.get('/:a/:b/:c', controller.override.one);
  overrideWebRouter.get('/:a/:b', controller.override.two);
  overrideWebAdminRouter.get('/:a', controller.override.three);
};
