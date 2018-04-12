import Api from '@/services/Api'

export default {
  insert (propertyID, farmitem) {
    return Api().post('insert_has', propertyID, farmitem)
  },

  delete (propertyID, name) {
    return Api().post('delete_has', propertyID, name)
  }
}
