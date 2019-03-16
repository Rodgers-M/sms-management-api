const HttpStatus = require('http-status')

const db = require('../database/models')
const { handleSuccess, handleFailure, handleSuccessResult } = require('../lib/helpers/responsesHelper')

class SmsController {
  static async sendSms(req, res, next) {
    try {
      const { message } = req.body
      const status = 'pending'

      await db.Sms.create({
        message,
        status,
      })
      return handleSuccess(res, HttpStatus.CREATED, 'sms created successful')
    } catch (error) {
      return handleFailure(res, HttpStatus.INTERNAL_SERVER_ERROR, error)
    }
    next()
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
