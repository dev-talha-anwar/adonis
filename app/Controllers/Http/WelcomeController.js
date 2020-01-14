'use strict'
const Validator = use('Validator')
const User = use('App/Models/User')

class WelcomeController {

	index ({ request, view }) {
    	
    	return view.render('theme.index');
  	}

	loginform ({ request, view }) {
    	
    	return view.render('theme.auth.login');
  	}

  	async login({auth,request,view,session,response}){

  		await request.validateAll({
			email: 'required|email',
			password: 'required|string'
		})
		const { email, password } = request.all()
	    if(await auth.attempt(email, password)){
	    	return response.route('index')
	    }else{
	    	session.flash({error : "Something Went Wrong."})
	    	return response.redirect('back')
	    }
  	}

	registerform ({ request, view }) {
    	
    	return view.render('theme.auth.register');
  	}

  	async register({auth,request,response,session}){
  		await request.validateAll({
			username: 'required|string|max:100',
			email: 'required|email|unique:users',
			password: 'required|string'
		})
  		if(await User.create(request.only(['username', 'email', 'password']))){
			session.flash({ success: "Registration Successfull" })
		}else{
			session.flash({ error: "Something Went Wrong" })
		}
    	return response.redirect('back')
  	}

}

module.exports = WelcomeController
