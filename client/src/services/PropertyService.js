import Api from '@/services/Api'

export default {
  insert (propertyName, acres, isCommercial, isPublic, streetAddress, city, zip, propertyType, username) {
    return Api().post('insert_property', propertyName, acres, isCommercial, isPublic, streetAddress, city, zip, propertyType, username)
  },
  get_id_by_name (propertyName) {
    return Api().post('get_back_id_by_propname', propertyName)
  }
}
