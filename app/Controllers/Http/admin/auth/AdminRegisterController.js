'use strict'
const Admin = use('App/Model/Admin')
const Validator = use('Validator')

class AdminRegisterController {
	registerform ({ request, view }) {
    	
    	return view.render('theme.auth.register');
  	}

  	async register({auth,request,response,session}){
  		await request.validateAll({
			username: 'required|string|max:100',
			email: 'required|email|unique:users',
			password: 'required|string'
		})
  		if(await Admin.create(request.only(['username', 'email', 'password']))){
			session.flash({ success: "Registration Successfull" })
		}else{
			session.flash({ error: "Something Went Wrong" })
		}
    	return response.redirect('back')
  	}
}

module.exports = AdminRegisterController
