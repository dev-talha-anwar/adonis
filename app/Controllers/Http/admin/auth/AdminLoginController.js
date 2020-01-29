'use strict'
const Validator = use('Validator')
const User = use('App/Models/User')


class AdminLoginController {

	loginform ({ request, view }) {
    	
    	return view.render('admin.auth.login');
  	}

  	async login({auth,request,view,session,response}){

  		await request.validateAll({
			email: 'required|email|exists:users,email',
			password: 'required|string'
		})
		if(await User.query().where({email:request.input('email'),role:'admin'}).first()){
			const { email, password } = request.all()
		    if(await auth.attempt(email, password)){
		    	return response.route('adminindex')
		    }else{
		    	session.flash({error : "Something Went Wrong."})
		    	return response.redirect('back')
		    }
		}else{
			session.flash({error : "Invalid Email."})
		    return response.redirect('back')
		}
  	}

}

module.exports = AdminLoginController
