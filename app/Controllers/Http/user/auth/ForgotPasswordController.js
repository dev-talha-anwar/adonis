'use strict'
const Mail = use('Mail')
const Encryption = use('Encryption')
const User = use('App/Models/User')
const helper = use('App/Helpers')
const Helper = new helper()
const Hash = use('Hash')

class ForgotPasswordController {
	
	showemailform ({ request, view }) {
    	return view.render('theme.auth.forgotpassword');
  	}

  	async sendemail({auth,request,view,session,response}){
  		await request.validateAll({
			email: 'required|email|exists:users,email'
		})
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
		const user = await User.query().where({email_verified_at:null,email:request.input('email')}).first()
		if(user){
			const roles = await user.getRoles()
			if(roles.includes('user')){
				const email_verified_at = Encryption.encrypt(Helper.time()+user.username)
		  		user.email_verified_at = email_verified_at
		  		if(await user.save()){
		    		await Mail.send('theme.auth.mails.forgotpassword',{token:email_verified_at}, (message) => {
		  		      message
		  		        .to(user.email)
		  		        .from('someone@example.com')
		  		        .subject('Password Reset Link.')
		  		    })
		  			session.flash({ msg: "Password Reset link has been sent to your email.",type: 'success' })
				}
			}	
		}else{
			session.flash({msg : "Invalid Email."})
		}
		return response.redirect('back')	
  	}

  	async showresetform({params,view}){
		return view.render('theme.auth.resetpassword',{email_verified_at:params.token})
  	}

  	async resetpassword({auth,request,view,session,response}){
  		await request.validateAll({
			password: 'required|string',
			token: "required|string"
		})
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
		const user = await User.query().where({email_verified_at:decodeURIComponent(request.input('token'))}).first()
		if(user){
			const roles = await user.getRoles()
			if(roles.includes('user')){
				user.password = request.input('password')
		  		user.email_verified_at = null
		  		if(await user.save()){
		  			session.flash({ msg: "Your Password has been reset You can Sign in now.",type: 'success' })
		  			return response.route('login')
				}
			}else{
				session.flash({msg: 'Not a User.'})
			}
		}else{
			session.flash({msg: 'Invalid Token.'})
		}	
		return response.redirect('back')
  	}
}

module.exports = ForgotPasswordController
