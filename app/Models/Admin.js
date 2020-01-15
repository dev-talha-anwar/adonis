'use strict'
const Hash = use('Hash')
const Model = use('Model')

class Admin extends Model {
	static get hidden () {
    	return ['password']
  	}
  	static boot () {
	    super.boot()
	    
	    this.addHook('beforeSave', async (userInstance) => {
	      if (userInstance.dirty.password) {
	        userInstance.password = await Hash.make(userInstance.password)
	      }
	    })
  	}
}
module.exports = Admin
