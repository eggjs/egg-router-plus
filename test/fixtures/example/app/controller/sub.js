'use strict';

const Controller = require('egg').Controller;

class SubController extends Controller {
  async getParam() {
    this.ctx.body = this.ctx.params;
  }

  async get() {
    this.ctx.body = 'sub get';
  }

  async post() {
    this.ctx.body = 'sub post';
  }
}

module.exports = SubController;
