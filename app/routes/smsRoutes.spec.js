const request = require('supertest')

const app = require('../app')

describe('#smsRoutes', () => {

beforeAll(async() => {
  const contacts = [
    {name: 'rodger', phone: '0707070707'},
    {name: 'keisha', phone: '0808080808'},
  ]
  await db.Contact.bulkCreate(contacts)
})
  describe('#getAll sms', ()=> {
    test('should return all sms in db', async () => {
      await db.Sms.create({message: 'hello world'})
      const response = await request(app).get('/sms')
      expect(JSON.parse(response.text).results[0].message).toBe('hello world')
    })
    test('should return message if no sms in db', async () => {
      await db.Sms.destroy({ force: true, truncate: { cascade: true } })
      const response = await request(app).get('/sms')
      expect(JSON.parse(response.text).message).toBe('no sms in the app yet')
    })
  })
  describe('#sendSms', () => {
    test('it should create an sms and return success message', async () => {
      const response = await request(app).post('/sms')
        .set('Content-Type', 'application/json')
        .send({message: 'some message', sender: '0707070707', receiver: '0808080808' })
      expect(JSON.parse(response.text).message).toEqual('sms created successful')
    })
  })
  describe('#deletedSms', () => {
    test('it should delete an sms successfuly', async () => {
      await db.Sms.create({message: 'hello world'})
      const response = await request(app).get('/sms')
      const id = JSON.parse(response.text).results[0].id
      const res = await request(app).delete(`/sms/${id}`)
      expect(JSON.parse(res.text)).toHaveProperty('message', 'message deleted successful')
    })
  })
})
