"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.storage = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = persist;

var _storage = require("./storage");

var _storage2 = _interopRequireDefault(_storage);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var persistInit = "@@/persist";
function persist() {
  var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ondispatch = config.ondispatch,
      _config$key = config.key,
      key = _config$key === undefined ? 'REDUX' : _config$key,
      _config$storage = config.storage,
      storage = _config$storage === undefined ? _storage2.default.getStorage('session') : _config$storage,
      _config$reducer = config.reducer,
      reducer = _config$reducer === undefined ? function (state) {
    return state;
  } : _config$reducer,
      _config$save = config.save,
      save = _config$save === undefined ? function (key, storage, state) {
    storage.setItem(key, JSON.stringify(state));
  } : _config$save;

  persist.config = {
    key: key,
    storage: storage,
    reducer: reducer,
    save: save,
    ondispatch: ondispatch
  };
  return function (createStore) {
    return function (a) {
      var b = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : JSON.parse(storage.getItem(key)) || undefined;
      var c = arguments[2];

      persist.initialState = createStore(a).getState();
      function reducers(state, action) {
        for (var _len = arguments.length, argv = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
          argv[_key - 2] = arguments[_key];
        }

        if (action && action.type === persistInit) {
          return a.apply(undefined, [action.newState, action].concat(argv));
        } else {
          return a.apply(undefined, [state, action].concat(argv));
        }
      }
      var store = createStore(reducers, b, c);
      var _dispatch = store.dispatch;
      store.dispatch = function (action) {
        if (ondispatch) {
          var newState = ondispatch({
            action: action,
            persistConfig: {
              key: key,
              storage: storage
            },
            initialState: _extends({}, persist.initialState)
          });
          if (newState) {
            _dispatch({
              type: persistInit,
              newState: Object.assign(JSON.parse(storage.getItem(key)), newState)
            });
          }
        }
        return _dispatch(action);
      };
      store.clearPersist = function () {
        return storage.removeItem(key);
      };
      store.subscribe(function () {
        save(key, storage, reducer(store.getState()));
      });
      return store;
    };
  };
}

var storage = exports.storage = _storage2.default;