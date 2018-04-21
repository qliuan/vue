import Api from '@/services/Api'

export default {
  log (username, propertyID, date, rating) {
    return Api().post('log', username, propertyID, date, rating)
  },
  unlog (username, propertyID) {
    return Api().post('unlog', username, propertyID)
  },
  checkexist (username, propertyID) {
    return Api().post('checkexist', username, propertyID)
  },
  visitHistory (username) {
    return Api().post('visit_history', username)
  },
  delete_property_visits (propertyID) {
    return Api().post('test', propertyID)
  }
}
