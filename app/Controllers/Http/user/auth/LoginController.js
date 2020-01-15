'use strict'
const Validator = use('Validator')
const User = use('App/Models/User')

class LoginController {

	loginform ({ request, view }) {
    	
    	return view.render('theme.auth.login');
  	}

  	async login({auth,request,view,session,response}){

  		await request.validateAll({
			email: 'required|email',
			password: 'required|string'
		})
		const { email, password } = request.all()
	    if(await auth.authenticator('user').attempt(email, password)){
	    	return response.route('index')
	    }else{
	    	session.flash({error : "Something Went Wrong."})
	    	return response.redirect('back')
	    }
  	}

}

module.exports = LoginController
