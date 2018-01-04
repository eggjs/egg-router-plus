'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async fallback() {
    this.ctx.body = 'fallback';
  }
}

module.exports = HomeController;
