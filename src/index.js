import storages from "./storage"
const persistInit = "@@/persist"
export default function persist(config={}) {
  const {
    ondispatch,
    key = 'REDUX',
    storage = storages.getStorage('session'),
    reducer = (state) => state,
    save = (key, storage, state) => {storage.setItem(key, JSON.stringify(state))}
  } = config
  persist.config = {
    key,
    storage,
    reducer,
    save,
    ondispatch
  }
  return (createStore) => (a, b=JSON.parse(storage.getItem(key)) || undefined, c) => {
    persist.initialState = createStore(a).getState()
    function reducers (state, action, ...argv) {
      if (action && action.type === persistInit) {
        return a(action.newState, action, ...argv)
      } else {
        return a(state, action, ...argv)
      }
    }
    let store = createStore(reducers, b, c)
    let _dispatch = store.dispatch
    store.dispatch = (action) => {
      if (ondispatch) {
        let newState = ondispatch({
          action,
          persistConfig: {
            key,
            storage
          },
          initialState: {...persist.initialState}
        })
        if (newState) {
          _dispatch({
            type: persistInit,
            newState: Object.assign(JSON.parse(storage.getItem(key)), newState)
          })
        }
      }
      return _dispatch(action)
    }
    store.clearPersist = () => storage.removeItem(key)
    store.subscribe(() => {
      save(key, storage, reducer(store.getState()))
    })
    return store
  }
}

export const storage = storages