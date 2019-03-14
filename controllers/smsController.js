const HttpStatus = require('http-status')

const db = require('../database/models')
const { handleSuccess, handleFailure, handleSuccessResult } = require('../lib/helpers/responsesHelper')

class SmsController {
  static async sendSms(req, res, next) {
    try {
      console.log(req.body)
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
    const sms = await db.Sms.findById(req.params.id)
    return handleSuccessResult(res, HttpStatus.OK, sms)
  }
}

module.exports = SmsController
