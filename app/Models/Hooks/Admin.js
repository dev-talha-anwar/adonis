'use strict'

const Hash = use('Hash')

const AdminHook = module.exports = {}

/**
 * Hash using password as a hook.
 *
 * @method
 *
 * @param  {Object} AdminInstance
 *
 * @return {void}
 */
AdminHook.hashPassword = async (AdminInstance) => {
  if (AdminInstance.dirty.password) {
    AdminInstance.password = await Hash.make(AdminInstance.password)
  }
}