const router = require('express').Router()

const ContactsController = require('../../controllers/contactsController')

router.get('/', ContactsController.getAllContacts)
router.get('/:id', ContactsController.getContactById)
router.post('/', ContactsController.createContact)
router.delete('/:id', ContactsController.deleteContact)

module.exports = router
