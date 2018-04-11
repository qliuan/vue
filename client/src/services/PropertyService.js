import Api from '@/services/Api'

export default {
  owner_property_detail (id) {
    return Api().post('owner_property_detail', id)
  }
}
