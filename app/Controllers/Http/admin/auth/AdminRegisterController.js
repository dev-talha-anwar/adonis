'use strict'
const User = use('App/Models/User')
const Validator = use('Validator')

class AdminRegisterController {
	registerform ({ request, view }) {
    	
    	return view.render('theme.auth.register');
  	}

  	async register({auth,request,response,session}){
  		await request.validateAll({
			username: 'required|string|max:100',
			email: 'required|email|unique:users',
			password: 'required|string',
			role: 'admin'
		})
  		if(await User.create(request.only(['username', 'email', 'password']))){
			session.flash({ success: "Registration Successfull" })
		}else{
			session.flash({ error: "Something Went Wrong" })
		}
    	return response.redirect('back')
  	}
}

module.exports = AdminRegisterController
