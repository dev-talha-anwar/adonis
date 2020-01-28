'use strict'
const Validator = use('Validator')
const User = use('App/Models/User')
const Mail = use('Mail')
const Encryption = use('Encryption')
const Helper = use('App/Helpers')
const helper = new Helper()

class RegisterController {

	registerform ({ request, view }) {
    	
    	return view.render('theme.auth.register');
  	}

  	async register({auth,request,response,session}){
  		await request.validateAll({
			username: 'required|string|max:100|unique:users|alpha_numeric',
			email: 'required|email|unique:users',
			password: 'required|string'
		})
		const validatedData = request.only(['username', 'email', 'password'])
		// const token = (helper.time()+request.username).toString();
		const email_verified_at = Encryption.encrypt(helper.time()+request.username)
		validatedData.email_verified_at = email_verified_at
		const user = await User.create(validatedData)
  		if(user){
  			await Mail.send('theme.auth.mails.register',{token:email_verified_at}, (message) => {
		      message
		        .to(user.email)
		        .from('someone@example.com')
		        .subject('Confirm Your Email')
		    })
			session.flash({ success: "Registration Successfull.You Must Verify your Email to signin." })
		}else{
			session.flash({ error: "Something Went Wrong" })
		}
    	return response.redirect('back')
  	}
  	async verifyEmail({params,response,session}){
  		const user = await User.query().where({
  			email_verified_at:decodeURIComponent(params.token),
  			role: 'user'
  		}).first()
  		if(user){
  			user.email_verified_at = null
  			if(await user.save()){
  				session.flash({ success: "Email Verified" })
  				return response.route('login')
  			}else{
  				session.flash({ error: "Something Went Wrong." })
  				return response.route('login')
  			}
  		}else{
  			session.flash({ error: "Invalid Verification Token.Please Click on Forgot Password" })
  			return response.route('login')
  		}
  	}
}

module.exports = RegisterController
