import {Router} from "express";
import {
    addContactController,
    deleteContactController,
    getContactByIdController,
    getContactsController,
    patchContactController,
    upsertContactController
} from "../controllesrs/contacts.js";
import {ctrlWrapper} from "../utils/ctrlWrapper.js";
import {validateBody} from "../utils/validateBody.js";
import {addContactSchema, updateContactSchema} from "../validation/contacts.js";
import {isValidId} from "../middlewares/isValidId.js";
import {authenticate} from "../middlewares/authenticate.js";

const contactsRouter = Router();

contactsRouter.use(authenticate)

contactsRouter.get('/', ctrlWrapper(getContactsController))

contactsRouter.get('/:id', isValidId, ctrlWrapper(getContactByIdController))

contactsRouter.post('/', validateBody(addContactSchema), ctrlWrapper(addContactController))

contactsRouter.put('/:id', isValidId, validateBody(addContactSchema), ctrlWrapper(upsertContactController))

contactsRouter.patch('/:id', isValidId, validateBody(updateContactSchema), ctrlWrapper(patchContactController))

contactsRouter.delete('/:id', isValidId, ctrlWrapper(deleteContactController))

export default contactsRouter;