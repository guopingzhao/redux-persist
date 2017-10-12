'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = undefined;
exports.default = persist;

var _storage = require('./storage');

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function persist() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _config$key = config.key,
      key = _config$key === undefined ? 'REDUX' : _config$key,
      _config$storage = config.storage,
      storage = _config$storage === undefined ? _storage2.default.getStorage('session') : _config$storage,
      _config$reducer = config.reducer,
      reducer = _config$reducer === undefined ? function (state) {
    return state;
  } : _config$reducer,
      _config$save = config.save,
      save = _config$save === undefined ? function (key, storage, state) {
    storage.setItem(key, JSON.stringify(reducer(state)));
  } : _config$save;

  return function (createStore) {
    return function (a) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSON.parse(storage.getItem(key)) || undefined;
      var c = arguments[2];

      var store = createStore(a, b, c);
      store.subscribe(function () {
        save(key, storage, store.getState());
      });
      return store;
    };
  };
}

var storage = exports.storage = _storage2.default;