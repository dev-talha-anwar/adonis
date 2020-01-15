'use strict'

class UserController {
	show({ auth,request,view}){
		return view.render('theme.dashboard')
	}
	async logout({auth,response}){
		await auth.authenticator('user').logout()
		return response.route('login')
	}
}

module.exports = UserController
