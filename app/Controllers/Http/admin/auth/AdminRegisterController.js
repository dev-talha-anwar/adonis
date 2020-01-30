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
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
  		if(await User.create(request.only(['username', 'email', 'password']))){
			session.flash({ msg: "Registration Successfull",type:'success' })
		}
    	return response.redirect('back')
  	}
}

module.exports = AdminRegisterController
