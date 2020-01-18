'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class UserAuth {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({auth,request,response, }, next) {
	  if(auth.user.role != 'user'){
    	return response.route('login')
	  }
    await next()
  }
}

module.exports = UserAuth
