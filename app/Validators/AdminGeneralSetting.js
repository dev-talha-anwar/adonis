'use strict'

class AdminGeneralSetting {
  get validateAll() {
    return true
  }
  get sanitizationRules() {
    return {
      'names.*': 'trim|strip_tags|escape',
      'links.*': 'trim|strip_tags|escape'
    }
  }
  get rules() {
    return {
      names: 'array',
      links: 'array',
      'names.*': 'string|required',
      'names.*': 'string|required'
    }
  }
  get messages () {
    return {
      'names.*.required': 'Name Cannot be empty or Invalid Value Entered.',
      'links.*.required': 'Link Cannot be empty or Invalid Value Entered.',
    }
  }
}

module.exports = AdminGeneralSetting
