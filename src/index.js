import storages from "./storage"
export default function persist(config={}) {
  const {
    ondispatch,
    key = 'REDUX',
    storage = storages.getStorage('session'),
    reducer = (state) => state,
    save = (key, storage, state) => {storage.setItem(key, JSON.stringify(reducer(state)))}
  } = config
  persist.config = {
    key,
    storage,
    reducer,
    save,
    ondispatch
  }
  return (createStore) => (a, b=JSON.parse(storage.getItem(key)) || undefined, c) => {
    let store = createStore(a, b, c)
    let _dispatch = store.dispatch
    store.dispatch = (action) => {
      if (ondispatch) ondispatch({
        action,
        persistConfig: {
          key,
          storage
        }
      })
      return _dispatch(action)
    }
    store.subscribe(() => {
      save(key, storage, store.getState())
    })
    return store
  }
}

export const storage = storages