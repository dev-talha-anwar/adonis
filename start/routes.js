'use strict'
const Route = use('Route')

//website rourtes
Route.get('/','WelcomeController.index').as('index').namespace('user')
Route.group(() => {
		Route.get('login','LoginController.loginform').as('showLoginForm')
		Route.post('login', 'LoginController.login').as('login')
		Route.get('register','RegisterController.registerform').as('showRegisterForm')
		Route.post('register', 'RegisterController.register').as('register')
}).namespace('user/auth').middleware(['guest'])
Route.group(() => {
	Route.get('users', 'UserController.show').as('dashboard')
	Route.get('logout', 'UserController.logout').as('logout')
}).namespace('user').middleware(['auth','userauth'])

//admin routes
Route.group(() => {
	Route.get('login','AdminLoginController.loginform').as('showAdminLoginForm')
	Route.post('login', 'AdminLoginController.login').as('admin.login')
	Route.get('register','AdminRegisterController.registerform').as('showRegisterForm')
	Route.post('register', 'AdminRegisterController.register').as('register')
}).prefix('admin').namespace('admin/auth').middleware(['guest'])
Route.group(() => {
	Route.get('/', 'AdminController.show').as('adminindex')
	Route.get('logout', 'AdminController.logout').as('admin.logout')
}).prefix('admin').namespace('admin').middleware(['auth','adminauth'])