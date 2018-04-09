import Api from '@/services/Api'

export default {
  FarmItem_register (Proptype, isAnimal) {
    return Api().post('farmitem_register', Proptype, isAnimal)
  }
}
