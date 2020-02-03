'use strict'

class UserRegister {
  get validateAll() {
    return true
  }
  get sanitizationRules() {
    return {
      'username': 'trim|strip_tags|escape',
      'email': 'trim|strip_tags|escape',
    }
  }
  get rules() {
    return {
      username: 'required|string|max:100|unique:users|alpha_numeric',
      email: 'required|email|unique:users',
      password: 'required|string'
    }
  }
}

module.exports = UserRegister
