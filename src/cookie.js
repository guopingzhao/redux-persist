export default class CookieStorage {
  setItem(key, data){
    document.cookie = `${key}=${data}`
  }
  getItem(key){
    let items = document.cookie.split(';')
    for(let item of items){
      let [k, v] = item.trim().split('=')
      if (k === key) {
        return v
      }
    }
    return null
  }
  removeItem(key){
    document.cookie = `${key}=; expires=${new Date()}`
  }
}