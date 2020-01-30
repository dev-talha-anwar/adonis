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
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
		const testadmin = await User.query().where({email:request.input('email')}).first()
		if(testadmin){
			const roles = await testadmin.getRoles()
			if(roles.includes('admin')){
				const { email, password } = request.all()
			    if(await auth.attempt(email, password)){
			    	return response.route('adminindex')
			    }
			}else{
				session.flash({msg : "Invalid Email."})
			}
		}else{
			session.flash({msg : "Invalid Email."})
		}
		return response.redirect('back')
  	}

}

module.exports = AdminLoginController
