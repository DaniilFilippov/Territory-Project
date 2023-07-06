import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  lands (credentials) {
    return Api().post('lands', credentials)
  }
}
