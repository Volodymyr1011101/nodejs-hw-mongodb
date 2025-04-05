import {addContact, deleteContact, getContactById, getContacts, updateContact} from "../services/contacts.js";
import createHttpError from "http-errors";

export const getContactsController = async (req, res) => {
        const data = await getContacts();

        if(!data) {
            throw createHttpError(400, "Could not find contacts");
        }

        res.json({
            status: 200,
            message: "Successfully found contacts!",
            data,
        });
}

export const getContactByIdController = async (req, res) => {
        const {id} = req.params;

        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                status: 400,
                message: "Invalid ID format. Must be a 24-character hex string."
            });
        }

        const data = await getContactById(id);

        if(!data){
            throw createHttpError(404, `Could not find ${id}`);
        }

        res.json({
            status: 200,
            message: `Successfully found contact with id ${id}!`,
            data,
        });
}

export const addContactController = async (req, res) => {
    const result = await addContact(req.body)

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        result,
    })
}

export const upsertContactController = async (req, res) => {
    const {id} = req.params;
    const result = await updateContact(id, req.body)

    res.status(200).json({
        status: 200,
        message: "Successfully upserted contact!",
        result,
    })
}

export const patchContactController = async (req, res) => {
    const {id} = req.params;
    const result = await updateContact(id, req.body);

    if(!result){
        throw createHttpError(404, `Contact not found`);
    }

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        result,
    })
}

export const deleteContactController = async (req, res) => {
    const {id} = req.params;
    const result = await deleteContact(id);

    if(!result){
        throw createHttpError(404, `Contact not found`);

    }

    res.status(204).json({
        status: 204,
        message: "Successfully deleted contact!",
        result,
    })
}