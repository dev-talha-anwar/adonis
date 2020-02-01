'use strict'
const GeneralSetting = use('App/Models/GeneralSetting')
const Helpers = use('Helpers')
const helper = use('App/Helpers')
const Helper = new helper()


class GeneralSettingController {
  async edit ({ request, response, view }) {
    const generalsettings = await GeneralSetting.query().first()
    return view.render('admin.general.edit',{generalsettings:generalsettings})
  }

  async update ({ request, response,session }) {
		const logo = request.file('logo', {
			types: ['image'],
			size: '2mb',
			extnames: ['jpg', 'jpeg' ,'png']
		})
		const name  = Helper.fileName(logo.subtype)
		await logo.move(Helpers.publicPath('storage'), {
			name: name
		})
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
		if (logo.moved()) {
			const generalsettings = await GeneralSetting.query().first()
			if(Helper.deleteFile(Helpers.publicPath('storage/'+generalsettings.logo))){
				generalsettings.logo = name;
				if(await generalsettings.save()){
					session.flash({msg : "Settings Saved." ,type: 'success'})
				}
			}
		}else{
			session.flash({msg : logo.error()})
		}
		return response.redirect('back')
	}
}

module.exports = GeneralSettingController
