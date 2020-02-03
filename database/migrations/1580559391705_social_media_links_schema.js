'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SocialMediaLinksSchema extends Schema {
  up () {
    this.create('social_media_links', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.text('link').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('social_media_links')
  }
}

module.exports = SocialMediaLinksSchema
