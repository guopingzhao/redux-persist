# Redux Persist
Persist and rehydrate a redux store.

`npm i --save redux-persist2`


## Basic Usage
Basic usage requires adding a few lines to a traditional redux application:
```js
import {compose, applyMiddleware, createStore} from 'redux'
import persist from 'redux-persist2'

// add `persist` as an enhancer to your store
const store = createStore(
  reducer,
  ...
  compose(
    applyMiddleware(...),
    persist(options)
  )
)

```
## Options
```js
key?String: default value "REDUX"
storage?Object: default value sessionStorage
reducer?Function: default value (state) => state
save?Function: default value (key, storage, state) => {storage.setItem(key, JSON.stringify(reducer(state)))}
```