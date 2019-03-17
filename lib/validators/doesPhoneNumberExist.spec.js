const db = require('../../database/models')
const doesPhoneNumberExist = require('./doesPhoneNumberExist')

describe('#doesPhoneNumberExist', () => {
  test('should return true if phone exists', async () => {
    await db.Contact.create({
      name: 'Rues',
      phone: '0707070707',
    })
    const doesPhoneExist = await doesPhoneNumberExist(db, '0707070707')
    expect(doesPhoneExist).toBeTruthy()
  })
  test('should return false if phone does not exist', async () => {
    const doesPhoneExist = await doesPhoneNumberExist(db, '0705060708')
    expect(doesPhoneExist).toBeFalsy()
  })
})

