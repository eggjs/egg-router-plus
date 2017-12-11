'use strict';

module.exports = app => {
  const { router, controller, middleware } = app;

  router.get('/', controller.home.index);

  const allRouter = app.getRouter('/all');
  allRouter.all('/test', controller.home.all);

  const subRouter = app.getRouter('/sub');
  subRouter.get('/get', controller.sub.get);
  subRouter.post('/post', controller.sub.post);
  subRouter.put('/put', controller.sub.put);
  subRouter.delete('/delete', controller.sub.del);
  subRouter.del('/del', controller.sub.del);
  subRouter.options('/options', controller.sub.options);
  subRouter.patch('/patch', controller.sub.patch);

  subRouter.get('/get/:id', controller.sub.getParam);
  subRouter.redirect('/go', '/');
  // router.redirect('/sub/go', '/sub/get');

  const adminRouter = app.getRouter('/admin', middleware.test({ prefix: 'admin' }));
  adminRouter.get('/get', controller.admin.get);
  adminRouter.post('/post', controller.admin.post);

  const nameRouter = app.getRouter('/name', middleware.test({ prefix: 'name' }));
  nameRouter.get('name_get', '/get', controller.admin.get);
  nameRouter.post('name_post', '/post', controller.admin.post);

  // resource
  const postRouter = app.getRouter('/api', middleware.test({ prefix: 'posts' }));
  postRouter.resources('posts', '/posts', controller.posts);

  // regex
  // const regexRouter = app.getRouter('/regex');
  // regexRouter.get(/^\/test\/.*/, controller.sub.get);
};
