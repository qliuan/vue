import Api from '@/services/Api'

export default {
  owner_property_detail (id) {
    return Api().post('owner_property_detail', id)
  },

  insert (propertyName, acres, isCommercial, isPublic, streetAddress, city, zip, propertyType, username) {
    return Api().post('insert_property', propertyName, acres, isCommercial, isPublic, streetAddress, city, zip, propertyType, username)
  },

  get_id_by_name (propertyName) {
    return Api().post('get_back_id_by_propname', propertyName)
  },

  delete_property (id) {
    return Api().post('delete_property', id)
  },

  update_property (infor) {
    return Api().post('update_property', infor)
  }
}
