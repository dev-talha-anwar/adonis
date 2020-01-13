'use strict'

class user\UserLogin {
  get rules () {
    return {
    	email: 'required|email|unique:users,email',
     	password: 'required|string'
    }
  }
}

module.exports = user\UserLogin
