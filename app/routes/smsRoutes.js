const HttpStatus = require('http-status')
const router = require('express').Router()

const SmsController = require('../../controllers/smsController')

router.get('/', SmsController.getAll)
router.get('/:id', SmsController.getSmsById)
router.post('/', SmsController.sendSms)

module.exports = router
