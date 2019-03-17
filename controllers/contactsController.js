const HttpStatus = require('http-status')

const db = require('../database/models')
const doesPhoneNumberExist = require('../lib/validators/doesPhoneNumberExist')
const { handleSuccess, handleFailure, handleSuccessResult } = require('../lib/helpers/responsesHelper')

class ContactsController {
  static async createContact(req, res) {
    try {
      const { name, phone } = req.body
      const phoneNumberExists = await doesPhoneNumberExist(db, phone)
      if(phoneNumberExists) handleFailure(res, HttpStatus.CONFLICT, {message: 'phone number already exists'})
      await db.Contact.create({
        name,
        phone,
      })
      return handleSuccess(res, HttpStatus.CREATED, 'contact created successful')
    } catch(error) {
      return handleFailure(res, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
  static async getAllContacts(req, res) {
    try {
      const contacts = await db.Contact.findAll()
      if(contacts.length) return handleSuccessResult(res, HttpStatus.OK, contacts)
      return handleSuccess(res, HttpStatus.OK, 'you have no contacts created yet')
    } catch(error) {
      return handleFailure(res, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
  static async getContactById(req, res) {
    try {
      const { id } = req.params
      const contact = await db.Contact.findById(id)
      if(contact) return handleSuccessResult(res, HttpStatus.OK, contact)
      return handleFailure(res, HttpStatus.NOT_FOUND, {message: `contact with id ${id} not found`})
    } catch(error) {
      return handleFailure(res, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
  static async deleteContact(req, res) {
    try {
      const { id } = req.params
      const deletedContact = await db.Contact.destroy({ where: { id } })
      if(deletedContact <= 0) return handleFailure(res, HttpStatus.NOT_FOUND, { message: 'Deletion failed, contact not found'})
      return handleSuccess(res, HttpStatus.OK, 'contact deleted successful')
    } catch(error) {
      return handleFailure(res, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
}

module.exports = ContactsController
