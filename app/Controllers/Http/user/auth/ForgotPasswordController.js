'use strict'

class ForgotPasswordController {
	
	showemailform ({ request, view }) {
    	
    	return view.render('theme.auth.forgotpassword');
  	}

  	async sendemail({auth,request,view,session,response}){

  		await request.validateAll({
			email: 'required|email|exists:users,email'
		})
		const user = await User.query().where({email_verified_at:null,email:request.input('email'),role:'user'}).first()
		if(user){
			const email_verified_at = Encryption.encrypt(helper.time()+user.username)
	  		user.email_verified_at = email_verified_at
	  		if(await user.save()){
	    		await Mail.send('theme.auth.mails.forgotpassword',{token:email_verified_at}, (message) => {
	  		      message
	  		        .to(user.email)
	  		        .from('someone@example.com')
	  		        .subject('Password Reset Link.')
	  		    })
	  			session.flash({ success: "Password Reset link has been sent to your email." })
			}else{
	  			session.flash({ error: "Something Went Wrong." })
			}
			return response.redirect('back')
		}else{
			session.flash({error : "Invalid Email."})
		    return response.redirect('back')
		}	
  	}

  	async showresetform({params,response,session}){
  		const user = await User.query().where({
  			email_verified_at:decodeURIComponent(params.token),
  			role: 'user'
  		}).first()
  		if(user){
			return response.route('forgot.reset',{email_verified_at:params.token})
  		}else{
  			session.flash({ error: "Invalid Verification Token.Please Click on Forgot Password" })
  			return response.route('login')
  		}
  	}

  	async resetpassword({auth,request,view,session,response}){
  		await request.validateAll({
			password: 'required',
			token: 
		})
		const user = await User.query().where({email_verified_at:null,email:request.input('email'),role:'user'}).first()
		if(user){
			const email_verified_at = Encryption.encrypt(helper.time()+user.username)
	  		user.email_verified_at = email_verified_at
	  		if(await user.save()){
	    		await Mail.send('theme.auth.mails.forgotpassword',{token:email_verified_at}, (message) => {
	  		      message
	  		        .to(user.email)
	  		        .from('someone@example.com')
	  		        .subject('Password Reset Link.')
	  		    })
	  			session.flash({ success: "Password Reset link has been sent to your email." })
			}else{
	  			session.flash({ error: "Something Went Wrong." })
			}
			return response.redirect('back')
		}else{
			session.flash({error : "Invalid Email."})
		    return response.redirect('back')
		}	
  	}


}

module.exports = ForgotPasswordController
