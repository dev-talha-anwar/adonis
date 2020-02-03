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
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
		const user = await User.query().where({email:request.input('email')}).first()
		if(user){
			const roles = await user.getRoles()
			if(roles.includes('user')){
				const forgot_password_token = Encryption.encrypt(Helper.time()+user.username)
		  		user.forgot_password_token = forgot_password_token
		  		if(await user.save()){
		    		await Mail.send('theme.auth.mails.forgotpassword',{token:forgot_password_token}, (message) => {
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
		return view.render('theme.auth.resetpassword',{forgot_password_token:params.token})
  	}

  	async resetpassword({auth,request,view,session,response}){
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
		const user = await User.query().where({forgot_password_token:decodeURIComponent(request.input('token'))}).first()
		if(user){
			const roles = await user.getRoles()
			if(roles.includes('user')){
				user.password = request.input('password')
		  		user.forgot_password_token = null
		  		user.email_verified_at= Helper.currentTime()
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
