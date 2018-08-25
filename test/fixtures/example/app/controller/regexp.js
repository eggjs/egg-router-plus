'use strict';

const Controller = require('egg').Controller;

class regexpController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async getParam() {
    this.ctx.body = this.ctx.params;
  }
}

module.exports = regexpController;
