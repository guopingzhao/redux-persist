'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cookie = require('./cookie');

var _cookie2 = _interopRequireDefault(_cookie);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  local: function local() {
    if (localStorage) return localStorage;
    return this.cookie();
  },
  session: function session() {
    if (sessionStorage) return sessionStorage;
    return this.cookie();
  },
  cookie: function cookie() {
    return new _cookie2.default();
  },
  getStorage: function getStorage(key) {
    switch (key) {
      case 'local':
        return this.local();
      case 'cookie':
        return this.cookie();
      default:
        return this.session();
    }
  }
};