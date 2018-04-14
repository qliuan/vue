import Api from '@/services/Api'

export default {
  delete_account (username) {
    return Api().post('delete_account', username)
  },

  delete_log (username) {
    return Api().post('delete_log', username)
  },

  get_visitors () {
    return Api().post('get_visitors')
  },

  admin_unconfirmed_overview () {
    return Api().post('admin_unconfirmed_overview')
  },

  admin_confirmed_overview () {
    return Api().post('admin_confirmed_overvie')
  },

  admin_manage_property (id, admin) {
    return Api.post('admin_manage_property', id, admin)
  },

  get_owners () {
    return Api().post('get_owners')
  },

  get_pending_items () {
    return Api().post('get_pending_items')
  },

  get_approved_items () {
    return Api().post('get_approved_items')
  },

  delete_item (name) {
    return Api().post('delete_item', name)
  },

  approve_item (name) {
    return Api().post('approve_item', name)
  }
}
