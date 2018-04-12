import Api from '@/services/Api'

export default {
  FarmItem_register (Proptype, isAnimal) {
    return Api().post('FarmItem_register', Proptype, isAnimal)
  },
  get_property_items (id) {
    return Api().post('get_property_items', id)
  },
  get_other_valid_items (propertyID) {
    return Api().post('get_other_valid_items', propertyID)
  }
}
