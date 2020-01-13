'use strict'

class WelcomeController {
	index ({ request, view }) {
    	return view.render('theme.index');
  	}
	loginform ({ request, view }) {
    	return view.render('theme.login');
  	}
  	login({request,view}){
  		return request.all()
  	}
}

module.exports = WelcomeController
