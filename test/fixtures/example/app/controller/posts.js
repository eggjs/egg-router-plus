'use strict';

const Controller = require('egg').Controller;

class PostController extends Controller {
  async index() {
    this.ctx.body = 'post index';
  }

  async show() {
    this.ctx.body = `post ${this.ctx.params.id}`;
  }
}

module.exports = PostController;
