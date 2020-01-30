'use strict'
const GeneralSetting = use('App/Models/GeneralSetting')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with generalsettings
 */
class GeneralSettingController {
  async index ({ request, response, view }) {
    const generalsettings = GeneralSetting.query().first()
    return view.render('admin.general.edit',{generalsettings:generalsettings})
  }

  async update ({ params, request, response }) {
  }

}

module.exports = GeneralSettingController
