module.exports = async (db, phone) => {
  try {
    const contact = await db.Contact.findOne({
      where: { phone }
    })
    if(contact) return contact
    return `phone number ${phone} does not exist`
  } catch(error) {
    throw new Error(error)
  }
}
