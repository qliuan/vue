import Api from '@/services/Api'

export default {
  FarmItem_register (Proptype) {
    return Api().post('FarmItem_register', Proptype)
  }
}
