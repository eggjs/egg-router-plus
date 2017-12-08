'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;

  router.get('/', controller.home.index);

  const subRouter = app.getRouter('/sub');
  subRouter.get('/get', controller.sub.get);
  subRouter.post('/post', controller.sub.post);
  subRouter.get('/get/:id', controller.sub.getParam);

  const adminRouter = app.getRouter('/admin', middleware.test({ prefix: 'admin' }));
  adminRouter.get('/get', controller.admin.get);
  adminRouter.post('/post', controller.admin.post);

  const nameRouter = app.getRouter('/name', middleware.test({ prefix: 'name' }));
  nameRouter.get('name_get', '/get', controller.admin.get);
  nameRouter.post('name_post', '/post', controller.admin.post);

  // TODO: resource
  const postRouter = app.getRouter('/api', middleware.test({ prefix: 'posts' }));
  postRouter.resources('posts', '/posts', controller.posts);

  // TODO: regex
  // const regexRouter = app.getRouter('/regex');
  // regexRouter.get(/^\/test\/.*/, controller.sub.get);
};
