'use strict'
const User = use('App/Models/User')
/*
|--------------------------------------------------------------------------
| AdminSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class AdminSeeder {
  async run () {
  	await User.create({ username: 'Admin', email : 'admin@site.com', password : 'admin123', role: "admin"})
  }
}

module.exports = AdminSeeder
