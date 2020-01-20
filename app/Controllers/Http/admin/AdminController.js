'use strict'

class AdminController {
	show({ auth,request,view}){
		return view.render('admin.index')
	}
	async logout({auth,response}){
		await auth.logout()
		return response.route('admin.login')
	}
}

module.exports = AdminController
