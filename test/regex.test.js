'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe.skip('test/regex.test.js', () => {
  let app;

  afterEach(mock.restore);
  afterEach(() => app.close());

  it('prefix is not allow to be regex', async () => {
    app = mock.app({
      baseDir: 'regex-prefix',
    });

    try {
      await app.ready();
      throw 'should not run here';
    } catch (err) {
      assert(err.message.includes('don\'t support regex'));
    }
  });

  it('path is not allow to be regex', async () => {
    app = mock.app({
      baseDir: 'regex-path',
    });

    try {
      await app.ready();
      throw 'should not run here';
    } catch (err) {
      assert(err.message.includes('don\'t support regex'));
    }
  });
});
