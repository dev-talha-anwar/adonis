'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
Route.get('/','WelcomeController.index').as('index')
Route.group(() => {
	Route.get('login','WelcomeController.loginform').as('showLoginForm')
	Route.post('login', 'WelcomeController.login').as('login')
	Route.get('register','WelcomeController.registerform').as('showRegisterForm')
	Route.post('register', 'WelcomeController.register').as('register')

}).middleware(['guest'])
Route.group(() => {

	Route.get('users', 'UserController.show').as('dashboard')
	Route.get('logout', 'UserController.logout').as('logout')

}).middleware(['auth'])
