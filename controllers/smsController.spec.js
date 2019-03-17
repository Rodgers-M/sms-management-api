const{ mockRequest, mockResponse } = require('mock-req-res')

const SmsController = require('./smsController')
beforeAll(async() => {
  const contacts = [
    {name: 'rodger', phone: '0707070707'},
    {name: 'keisha', phone: '0808080808'},
  ]
  await db.Contact.bulkCreate(contacts)
})

describe('#SmsController', () => {

  const req = {
    body: {
      message: 'hello',
      sender: '0707070707',
      receiver: '0808080808',
    },
    params: {
      id: 1
    },
  } 
  
  describe('#sendSms method', () => {
    test('it should create sms and return success message', async () => {
      const res = mockResponse({
        json: jest.fn()
      })
     await SmsController.sendSms(req, res)
     expect(res.json).toHaveBeenCalledWith({
       message: 'sms created successful'
     })
    })
    test('it should return error message if an error occurs', async () => {
      const res = mockResponse({
        json: jest.fn()
      })
      const emptyReq = {}
     await SmsController.sendSms(emptyReq, res)
     expect(res.json).toHaveBeenCalledWith({
       message: "Cannot destructure property `message` of 'undefined' or 'null'."
     })
    })
  })
  describe('#getAll method', () => {
    test('should return a message if no sms exist', async () => {
      await db.Sms.destroy({ force: true, truncate: { cascade: true } });
      const res = mockResponse({
        json: jest.fn()
      })
      await SmsController.getAll(req, res)
      expect(res.json).toHaveBeenCalledWith({
        message: 'no sms in the app yet'
      })
    })
  })
  describe('#getSmsById method', () => {
    test('should return and sms given and id', async () => {
      const res = mockResponse({
        json: jest.fn()
      })
      const res2 = mockResponse({
        json: jest.fn()
      })
      await SmsController.sendSms(req, res)
      await SmsController.getAll(req, res2)
      expect(res2.json).toHaveBeenCalled()
    })
  })
})
