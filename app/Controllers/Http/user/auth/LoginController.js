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
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
		const testuser = await User.query()
			.whereNotNull('email_verified_at')
			.where('email',request.input('email'))
			.first()
		if(testuser){
			const roles = await testuser.getRoles()
			if(roles.includes('user')){
				const { email, password } = request.all()
			    if(await auth.attempt(email, password)){
			    	return response.route('index')
			    }
			}else{
				session.flash({msg : "Invalid Email."})
			}
		}else{
			session.flash({msg : "Your Email is Not Verified."})
		}
		return response.redirect('back')
  	}
}

module.exports = LoginController
