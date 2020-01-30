'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GeneralSettingSchema extends Schema {
  up () {
    this.create('general_settings', (table) => {
      table.increments()
      table.string('logo', 80)
      table.string('address', 255)
      table.string('phone', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('general_settings')
  }
}

module.exports = GeneralSettingSchema
