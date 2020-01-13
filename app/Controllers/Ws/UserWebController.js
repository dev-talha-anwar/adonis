'use strict'

class UserWebController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }
}

module.exports = UserWebController
