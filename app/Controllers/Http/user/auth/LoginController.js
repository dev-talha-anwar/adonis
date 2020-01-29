'use strict'
const Validator = use('Validator')
const User = use('App/Models/User')

class LoginController {

	loginform ({ request, view }) {
    	
    	return view.render('theme.auth.login');
  	}

  	async login({auth,request,view,session,response}){

  		await request.validateAll({
			email: 'required|email|exists:users,email',
			password: 'required|string'
		})
		if(await User.query().where({email_verified_at:null,email:request.input('email'),role:'user'}).first()){
			const { email, password } = request.all()
		    if(await auth.attempt(email, password)){
		    	return response.route('index')
		    }else{
		    	session.flash({error : "Something Went Wrong."})
		    	return response.redirect('back')
		    }
		}else{
			session.flash({error : "Your Email is Not Verified."})
		    return response.redirect('back')
		}	
  	}
}

module.exports = LoginController
