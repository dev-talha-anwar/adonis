'use strict'
const Admin = use('App/Models/Admin')

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
  	await Admin.create({ username: 'Admin', email : 'admin@site.com', password : 'admin123'})
  }
}

module.exports = AdminSeeder
