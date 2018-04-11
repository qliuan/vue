import Api from '@/services/Api'

export default {
  insert (propertyID, farmitem) {
    return Api().post('insert_has', propertyID, farmitem)
  }
}
