const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')
  Exception.handle('InvalidSessionException', async (error, { request,response, session }) => {
  	if(request.url().startsWith("/admin")){
      return response.route('admin.login')
  	}else{
  		return response.route('login')
  	}
  })
  Exception.handle('HttpException', async (error, {auth, response, session }) => {
    if(auth.user.hasOwnProperty('role')){
      if (auth.user.role == 'admin') {
        return response.route('adminindex')
      }
      else if(auth.user.role == 'user'){
        return response.route('dashboard')
      }  
    }
    
  })
})