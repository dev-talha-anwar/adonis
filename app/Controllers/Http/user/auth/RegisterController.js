'use strict'
const Validator = use('Validator')
const User = use('App/Models/User')
const Role = use('Adonis/Acl/Role')
const Mail = use('Mail')
const Encryption = use('Encryption')
const helper = use('App/Helpers')
const Helper = new helper()

class RegisterController {

  registerform({ request, view }) {

    return view.render('theme.auth.register');
  }

  async register({ auth, request, response, session }) {
    session.flash({ msg: "Something Went Wrong.", type: 'error' })
    const validatedData = request.only(['username', 'email', 'password'])
    const forgot_password_token = Encryption.encrypt(Helper.time() + request.username)
    validatedData.forgot_password_token = forgot_password_token
    const user = await User.create(validatedData)
    if (user) {
      const userrole = await Role.query().where({ slug: 'user' }).first()
      if (await user.roles().attach([userrole.id])) {
        await Mail.send('theme.auth.mails.register', { token: forgot_password_token }, (message) => {
          message
            .to(user.email)
            .from('someone@example.com')
            .subject('Confirm Your Email')
        })
        session.flash({ msg: "Registration Successfull.You Must Verify your Email to signin.", type: 'success' })
      } else {
        if (await user.delete()) {
          session.flash({ msg: "Please Register Again.Something Went Wrong." })
        }
      }
    }
    return response.redirect('back')
  }
  async verifyEmail({ params, response, session }) {
    session.flash({ msg: "Something Went Wrong.", type: 'error' })
    const user = await User.query().where({
      forgot_password_token: decodeURIComponent(params.token)
    }).first()
    if (user) {
      const roles = await user.getRoles()
      if (roles.includes('user')) {
        user.forgot_password_token = null
        user.email_verified_at = Helper.currentTime()
        if (await user.save()) {
          session.flash({ msg: "Email Verified", type: 'success' })
        }
      }
    } else {
      session.flash({ msg: "Invalid Verification Token.Please Click on Forgot Password" })
    }
    return response.route('login')
  }
}

module.exports = RegisterController
