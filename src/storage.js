import CookieStorage from "./cookie"
export default {
  local(){
    if(localStorage) return localStorage
    return this.cookie()
  },
  session(){
    if(sessionStorage) return sessionStorage
    return this.cookie()
  },
  cookie(){
    return new CookieStorage()
  },
  getStorage(key){
    switch(key){
      case 'local':
        return this.local()
      case 'cookie':
        return this.cookie()
      default:
        return this.session()
    }
  }
}