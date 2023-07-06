import Api from '@/services/Api'

export default {
  register (credentials) {
    return Api().post('register', credentials)
  },
  lands (params) {
    return Api().post('territories', {
      params: params
    })
  }
}
