'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    this.ctx.body = 'hi, egg';
  }

  async all() {
    this.ctx.status = 200;
    this.ctx.set('x-result', 'all');
  }
}

module.exports = HomeController;
