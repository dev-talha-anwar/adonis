'use strict'
const SocialMediaLink = use('App/Models/SocialMediaLink')
const GeneralSetting = use('App/Models/GeneralSetting')
const Helpers = use('Helpers')
const helper = use('App/Helpers')
const Helper = new helper()
const { sanitize } = use('Validator')


class GeneralSettingController {
  async edit ({ request, response, view }) {
    const generalsettings = await GeneralSetting.query().first()
    const sociallinks = await SocialMediaLink.all()
    return view.render('admin.general.edit',{generalsettings:generalsettings,sociallinks:sociallinks})
  }

  async update ({ request, response,session }) {
	  	await request.validateAll({
			names: 'array',
			links: 'array',
			'names.*':'string',
			'names.*': 'string'
		})
		const data = sanitize(request.all(), {
			'names.*': 'trim|strip_tags|escape',
			'links.*': 'trim|strip_tags|escape'
		})
		const {names,links} = data
		session.flash({ msg: "Something Went Wrong.",type: 'error' })
		if(request.file('logo')){
			const logo = request.file('logo', {
			types: ['image'],
			size: '2mb',
			extnames: ['jpg', 'jpeg' ,'png']
			})
			const name  = Helper.fileName(logo.subtype)
			await logo.move(Helpers.publicPath('storage'), {
				name: name
			})
			if (logo.moved()) {
				const generalsettings = await GeneralSetting.query().first()
				if(Helper.deleteFile(Helpers.publicPath('storage/'+generalsettings.logo))){
					generalsettings.logo = name;
					await generalsettings.save()
				}
			}else{
				session.flash({msg : logo.error()})
				return response.redirect('back')
			}
		}
		if(names && links){
			if(names.length == links.length){
				await SocialMediaLink.truncate()
				let records = []
				names.forEach(function(name,index){
				let obj = {}
				obj.name = name
				obj.link = links[index]
				obj.created_at = Helper.currentTime();
				obj.updated_at = Helper.currentTime();
				records.push(obj)
				})
				await SocialMediaLink.query().insert(records)
				session.flash({msg : "Settings Saved." ,type: 'success'})
			}
		}else{
			await SocialMediaLink.truncate()
			session.flash({msg : "Settings Saved." ,type: 'success'})
		}
		return response.redirect('back')
	}
}

module.exports = GeneralSettingController
