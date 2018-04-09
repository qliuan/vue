import Api from '@/services/Api'

export default {
  owner_overview (credentials) {
    return Api().post('owner_overview', credentials)
  }
}
