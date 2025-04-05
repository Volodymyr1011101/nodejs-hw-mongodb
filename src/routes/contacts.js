import {getContactById, getContacts} from "../services/contacts.js";
import {Router} from "express";
import {
    addContactController, deleteContactController,
    getContactByIdController,
    getContactsController, patchContactController,
    upsertContactController
} from "../controllesrs/contacts.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController))

contactsRouter.get('/:id',ctrlWrapper(getContactByIdController))

contactsRouter.post('/',ctrlWrapper(addContactController))

contactsRouter.put('/:id',ctrlWrapper(upsertContactController))

contactsRouter.patch('/:id',ctrlWrapper(patchContactController))

contactsRouter.delete('/:id', ctrlWrapper(deleteContactController))

export default contactsRouter;