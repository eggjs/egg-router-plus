'use strict';

const Controller = require('egg').Controller;

class AdminController extends Controller {
  async get() {
    this.ctx.body = 'admin get';
  }

  async post() {
    this.ctx.body = 'admin post';
  }
}

module.exports = AdminController;
