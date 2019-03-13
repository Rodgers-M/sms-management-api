const HttpStatus = require('http-status')
const router = require('express').Router()

const SmsController = require('../../controllers/smsController')

router.get('/', (req, res) => res.send('first route hit'))
router.post('/')

module.exports = router
