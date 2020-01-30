'use strict'
const Validator = use('Validator')
const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
const Mail = use('Mail')
const Encryption = use('Encryption')
const helper = use('App/Helpers')
const Helper = new helper()

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
      session.flash({ msg: "Something Went Wrong.",type: 'error' })
  		const validatedData = request.only(['username', 'email', 'password'])
  		const email_verified_at = Encryption.encrypt(Helper.time()+request.username)
  		validatedData.email_verified_at = email_verified_at
  		const user = await User.create(validatedData)
    	if(user){
          const userrole =await Role.query().where({slug:'user'}).first()
          if(await user.roles().attach([userrole.id])){
            await Mail.send('theme.auth.mails.register',{token:email_verified_at}, (message) => {
            message
              .to(user.email)
              .from('someone@example.com')
              .subject('Confirm Your Email')
            })
            session.flash({ msg: "Registration Successfull.You Must Verify your Email to signin.",type:'success' })
          }else{
            if(await user.delete()){
              session.flash({ msg: "Please Register Again.Something Went Wrong." })
            }
          }	
  		}
    	return response.redirect('back')
  	}
  	async verifyEmail({params,response,session}){
      session.flash({ msg: "Something Went Wrong.",type: 'error' })
  		const user = await User.query().where({
  			email_verified_at:decodeURIComponent(params.token)
  		}).first()
  		if(user){
        const roles = await user.getRoles()
        if(roles.includes('user')){
          user.email_verified_at = null
          if(await user.save()){
            session.flash({ msg: "Email Verified" ,type: 'success' })
          }
        }
  		}else{
  			session.flash({ msg: "Invalid Verification Token.Please Click on Forgot Password" })
  		}
      return response.route('login')
  	}
}

module.exports = RegisterController
