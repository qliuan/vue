import Api from '@/services/Api'

export default {
  owner_overview (username) {
    return Api().post('owner_overview', username)
  },
  owner_others_overview (username) {
    return Api().post('owner_others_overview', username)
  }
}
