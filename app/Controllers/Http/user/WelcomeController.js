'use strict'

class WelcomeController {
	index ({ request, view }) {
    	return view.render('theme.index');
  	}
}

module.exports = WelcomeController
