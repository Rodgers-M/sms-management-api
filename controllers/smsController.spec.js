const{ mockRequest, mockResponse } = require('mock-req-res')

const SmsController = require('./smsController')

describe('#SmsController', () => {
  const req = {
    body: {
      message: 'hello',
      recieverId: '123',
      senderId: '234',
    }
  } 
  const res = mockResponse({
    send: jest.fn()
  })

  describe('#sendSms method', () => {
    test('it should create sms and return success message', async () => {
     await SmsController.sendSms(req, res)
     expect(res.send)
    })
  })
})
