const db = require('../../database/models')
const getContactByPhone = require('./getContactByPhone')

describe('#getContactByPhone', () => {
  test('should return a contact given an existing phone number', async () => {
    await db.Contact.create({name: 'rodgy', phone: '0712345678'})
    const contact = await getContactByPhone(db, '0712345678')
    expect(contact).toHaveProperty('name', 'rodgy')
  })
  test('should return a message if contact does not exist', async () => {
    const contact = await getContactByPhone(db, '0800234567')
    expect(contact).toEqual('phone number 0800234567 does not exist')
  })
})
