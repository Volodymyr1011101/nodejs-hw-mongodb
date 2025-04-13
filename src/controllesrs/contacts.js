import {addContact, deleteContact, getContactById, getContacts, updateContact} from "../services/contacts.js";
import createHttpError from "http-errors";
import {parsePaginationParams} from "../utils/parsePaginationParams.js";
import {parseSortParams} from "../utils/parseSortParams.js";
import {contactsSortFields} from "../db/models/Contacts.js";
import {parseContactsFilterParams} from "../utils/filters/parseContactsFilterParams.js";
export const getContactsController = async (req, res) => {
    const paginationParams = parsePaginationParams(req.query);
    const sortParams = parseSortParams(req.query, contactsSortFields);
    const filters = parseContactsFilterParams(req.query);

    const data = await getContacts({...paginationParams, ...sortParams, filters});

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
            throw createHttpError(404, `Invalid ID format. Must be a 24-character hex string.`);
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

export const addContactController = async (req, res, next) => {
    const data = await addContact(req.body)

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })
}

export const upsertContactController = async (req, res) => {
    const {id} = req.params;
    const data = await updateContact(id, req.body)

    res.status(200).json({
        status: 200,
        message: "Successfully upserted contact!",
        data,
    })
}

export const patchContactController = async (req, res) => {
    const {id} = req.params;
    const data = await updateContact(id, req.body);

    if(!data){
        throw createHttpError(404, `Contact not found`);
    }

    res.status(200).json({
        status: 200,
        message: "Successfully patched a contact!",
        data,
    })
}

export const deleteContactController = async (req, res) => {
    const {id} = req.params;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw createHttpError(404, `Invalid ID format. Must be a 24-character hex string.`);
    }

    const data = await deleteContact(id);

    if (!data){
        throw createHttpError(404, `Contact not found`);
    }

    res.status(200).json({
        status: 204,
        message: "Successfully deleted contact!",
        data,
    })
}