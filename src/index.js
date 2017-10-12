import storages from "./storage"
export default function persist(config={}) {
  const {
    key = 'REDUX',
    storage = storages.getStorage('session'),
    reducer = (state) => state,
    save = (key, storage, state) => {storage.setItem(key, JSON.stringify(reducer(state)))}
  } = config
  return (createStore) => (a, b=JSON.parse(storage.getItem(key)) || undefined, c) => {
    let store = createStore(a, b, c)
    store.subscribe(() => {
      save(key, storage, store.getState())
    })
    return store
  }
}

export const storage = storages