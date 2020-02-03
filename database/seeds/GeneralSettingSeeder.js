'use strict'
const GeneralSetting = use('App/Models/GeneralSetting')

/*
|--------------------------------------------------------------------------
| GeneralSettingSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class GeneralSettingSeeder {
  async run () {
  	await GeneralSetting.create({logo:"aaa.png",address:'address',phone:'phone'})
  }
}

module.exports = GeneralSettingSeeder
