'use strict'
const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
const helper = use('App/Helpers')
const Helper = new helper()

const Factory = use('Factory')

class RoleSeeder {
  async run () {
  	const adminRole = await Role.create({name:'Admin',slug:'admin',description:'manage administration privileges'})
  	const admin = await User.create({ username: 'Admin', email : 'admin@site.com', password : 'admin123',email_verified_at: Helper.currenTime()})
  	await admin.roles().attach([adminRole.id])
  	await Role.create({name:'User',slug:'user',description:'manage user privileges'})
  }
}

module.exports = RoleSeeder
