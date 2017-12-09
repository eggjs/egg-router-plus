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

  async put() {
    this.ctx.body = 'sub put';
  }

  async del() {
    this.ctx.status = 200;
    this.ctx.set('x-result', 'sub del');
  }

  async options() {
    this.ctx.status = 200;
    this.ctx.set('x-result', 'sub options');
  }

  async patch() {
    this.ctx.status = 200;
    this.ctx.set('x-result', 'sub patch');
  }

  async head() {
    this.ctx.status = 200;
    this.ctx.set('x-result', 'sub head');
  }
}

module.exports = SubController;
