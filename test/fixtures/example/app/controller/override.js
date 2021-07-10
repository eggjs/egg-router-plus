'use strict';

const Controller = require('egg').Controller;

class OverrideController extends Controller {
  async one() {
    this.ctx.body = { method: 'one', params: this.ctx.params };
  }

  async two() {
    this.ctx.body = { method: 'two', params: this.ctx.params };
  }

  async three() {
    this.ctx.body = { method: 'three', params: this.ctx.params };
  }
}

module.exports = OverrideController;
