const { hooks } = require('@adonisjs/ignitor')
const Admin = use('App/Models/Admin')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')
  Exception.handle('InvalidSessionException', async (error, { request,response, session }) => {
  	if(request.url().startsWith("admin")){
    	return response.route('admin/login')
  	}else{
  		return response.route('login')
  	}
  })
  Exception.handle('HttpException', async (error, { response, session }) => {
  	if (auth.user instanceof Admin) {
  		return response.route('adminindex')
	}else{
  		return response.route('users')
	}
  })
})