module.exports = async (db, phone) => {
  try {
    const contact = await db.Contact.findOne({
      where: { phone }
    })
    return contact
  } catch(error) {
    throw new Error(error)
  }
}
