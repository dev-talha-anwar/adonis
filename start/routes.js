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
Route.get('/','WelcomeController.index')
Route.group(() => {

	Route.get('login','WelcomeController.loginform').as('showLoginForm')
	Route.post('login', 'WelcomeController.login').as('login')

}).middleware(['guest'])
Route.group(() => {

	Route.get('users/:id', 'UserController.show')

}).middleware(['auth'])


