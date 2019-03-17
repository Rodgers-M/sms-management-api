const HttpStatus = require('http-status')

const db = require('../database/models')
const { handleSuccess, handleFailure, handleSuccessResult } = require('../lib/helpers/responsesHelper')
const getContactByPhone = require('../lib/contacts/getContactByPhone')

class SmsController {
  static async sendSms(req, res) {
    try {
      const { message, sender, receiver } = req.body
      const receiverContact = await getContactByPhone(db, receiver)
      const senderContact = await getContactByPhone(db, sender)
      if(!receiverContact) return handleFailure(
        res,
        HttpStatus.CONFLICT,
        {message: `the receiver phone, ${receiver} does not exist, please provide a valid phone`},
      )
      if(!senderContact) return handleFailure(
        res,
        HttpStatus.CONFLICT,
        {message: `the sender phone, ${sender} does not exist, please provide a valid phone`},
      )

      await db.Sms.create({
        message,
        status: 'pending',
        receiverId: receiverContact.id,
        senderId: senderContact.id
      })
      return handleSuccess(res, HttpStatus.CREATED, 'sms created successful')
    } catch (error) {
      return handleFailure(res, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }

  static async getAll(req, res) {
    try {
      const sms = await db.Sms.findAll()
      if (sms.length) return handleSuccessResult(res, HttpStatus.OK, sms)
      return handleSuccess(res, HttpStatus.OK, 'no sms in the app yet')
    } catch(error) {
      return handleFailure(res, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
  static async getSmsById(req, res) {
    try {
      const sms = await db.Sms.findById(req.params.id)
      if(sms) return handleSuccessResult(res, HttpStatus.OK, sms)
      return handleSuccess(res, HttpStatus.OK, 'no sms with given id')
    } catch (error) {
      return handleFailure(res, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
  static async deleteSms(req, res) {
    try {
      const { id } = req.params
      const deletedSms = await db.Sms.destroy({ where: { id } })
      if(deletedSms <= 0) return handleFailure(res, HttpStatus.NOT_FOUND, { message: 'Deletion failed, message not found'})
      return handleSuccess(res, HttpStatus.OK, 'message deleted successful')
    } catch(error) {
      return handleFailure(res, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
  }
}

module.exports = SmsController
