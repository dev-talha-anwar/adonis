'use strict'
const Validator = use('Validator')

class AdminLoginController {

	loginform ({ request, view }) {
    	
    	return view.render('admin.auth.login');
  	}

  	async login({auth,request,view,session,response}){

  		await request.validateAll({
			email: 'required|email',
			password: 'required|string'
		})
		const { email, password } = request.all()
	    if(await auth.attempt(email, password)){
	    	return response.route('adminindex')
	    }else{
	    	session.flash({error : "Something Went Wrong."})
	    	return response.redirect('back')
	    }
  	}

}

module.exports = AdminLoginController
