'use strict'

class ResetAdminPassword {
  get validateAll() {
    return true
  }
  get sanitizationRules() {
    return {
      'token': 'trim|strip_tags'
    }
  }
  get rules() {
    return {
      password: 'required|string',
      token: "required|string"
    }
  }
}

module.exports = ResetAdminPassword
