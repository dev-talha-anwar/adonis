'use strict'

class SendUserForgotPasswordEmail {
  get validateAll() {
    return true
  }
  get sanitizationRules() {
    return {
      'email': 'trim|strip_tags|escape',
    }
  }
  get rules() {
    return {
      email: 'required|email|exists:users,email'
    }
  }
  get messages () {
    return {
      'email.required': 'Name Cannot be empty or Invalid Value Entered.',
    }
  }
}

module.exports = SendUserForgotPasswordEmail
