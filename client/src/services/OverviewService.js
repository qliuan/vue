import Api from '@/services/Api'

export default {
  owner_overview (username) {
    return Api().post('owner_overview', username)
  },
  owner_others_overview (username) {
    return Api().post('owner_others_overview', username)
  },
  confirmed_property_list (admin) {
    return Api().post('confirmed_property_list', admin)
  },
  unconfirmed_property_list (admin) {
    return Api().post('unconfirmed_property_list', admin)
  },
  visitor_overview () {
    return Api().post('visitor_overview')
  }
}
