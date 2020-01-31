'use strict'
const GeneralSetting = use('App/Models/GeneralSetting')
const Helpers = use('Helpers')
const helper = use('App/Helpers')
const Helper = new helper()

class GeneralSettingController {
  async edit ({ request, response, view }) {
    const generalsettings = GeneralSetting.query().first()
    return view.render('admin.general.edit',{generalsettings:generalsettings})
  }

  async update ({ request, response,session }) {
		const logo = request.file('logo', {
			types: ['image'],
			size: '2mb',
			extnames: ['jpg', 'jpeg' ,'png']
		})
		await logo.move(Helpers.tmpPath('storage'), (file) =>{
			return {
				name: Helper.fileName(file.subtype),
			}
		})
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
		if (logo.moved()) {
			session.flash({msg : "Settings Saved." ,type: 'success'})
		}else{
			session.flash({msg : logo.error()})
		}
		return response.redirect('back')
	}
}

module.exports = GeneralSettingController
