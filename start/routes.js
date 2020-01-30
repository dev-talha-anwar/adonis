'use strict'
const Route = use('Route')

//website rourtes
Route.get('/','WelcomeController.index').as('index').namespace('user')

Route.group(() => {
	Route.get('login','LoginController.loginform').as('showLoginForm')
	Route.post('login', 'LoginController.login').as('login')
	Route.get('register','RegisterController.registerform').as('showRegisterForm')
	Route.post('register', 'RegisterController.register').as('register')
	Route.get('verify/:token','RegisterController.verifyEmail').as('verify.email')
	Route.get('user/forgot/password','ForgotPasswordController.showemailform').as('forgot.password')
	Route.post('user/forgot/password','ForgotPasswordController.sendemail').as('forgot.password.submit')
	Route.get('user/reset/password/:token','ForgotPasswordController.showresetform').as('forgot.reset')
	Route.post('user/reset/password','ForgotPasswordController.resetpassword').as('forgot.reset.submit')
		
}).namespace('user/auth').middleware(['guest'])

Route.group(() => {
	Route.get('users', 'UserController.show').as('dashboard')
	Route.get('logout', 'UserController.logout').as('logout')
	
}).namespace('user').middleware(['auth','is:user'])

//admin routes
Route.group(() => {
	Route.get('login','AdminLoginController.loginform').as('showAdminLoginForm')
	Route.post('login', 'AdminLoginController.login').as('admin.login')
	Route.get('forgot/password','ForgotPasswordController.showemailform').as('admin.forgot.password')
	Route.post('forgot/password','ForgotPasswordController.sendemail').as('admin.forgot.password.submit')
	Route.get('reset/password/:token','ForgotPasswordController.showresetform').as('admin.forgot.reset')
	Route.post('reset/password','ForgotPasswordController.resetpassword').as('admin.forgot.reset.submit')

}).prefix('admin').namespace('admin/auth').middleware(['guest'])

Route.group(() => {
	Route.get('/', 'AdminController.show').as('adminindex')
	Route.get('logout', 'AdminController.logout').as('admin.logout')

}).prefix('admin').namespace('admin').middleware(['auth','is:admin'])