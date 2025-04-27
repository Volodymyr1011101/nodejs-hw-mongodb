import {addContact, deleteContact, getContactById, getContacts, updateContact} from "../services/contacts.js";
import createHttpError from "http-errors";
import {parsePaginationParams} from "../utils/parsePaginationParams.js";
import {parseSortParams} from "../utils/parseSortParams.js";
import {contactsSortFields} from "../db/models/Contacts.js";
import {parseContactsFilterParams} from "../utils/filters/parseContactsFilterParams.js";
import {saveToCloudinary} from "../utils/saveFileToCloudinary.js";

export const getContactsController = async (req, res) => {
    const paginationParams = parsePaginationParams(req.query);
    const sortParams = parseSortParams(req.query, contactsSortFields);
    const filters = parseContactsFilterParams(req.query);
    filters.userId = req.user._id
    const data = await getContacts({...paginationParams, ...sortParams, filters});

    if (!data) {
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
    const userId = req.user._id;
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        throw createHttpError(404, `Invalid ID format. Must be a 24-character hex string.`);
    }
    console.log(userId);
    const data = await getContactById(id, userId);

    if (!data) {
        throw createHttpError(404, `Could not find ${id}`);
    }

    res.json({
        status: 200,
        message: `Successfully found contact with id ${id}!`,
        data,
    });
}

export const addContactController = async (req, res, next) => {
    const {_id: userId} = req.user;
    let photo = null;
    if (req.file) {
        photo = await saveToCloudinary(req.file);
    }
    const data = await addContact({...req.body, userId, photo});

    res.status(201).json({
        status: 201,
        message: "Successfully created a contact!",
        data,
    })
}

export const upsertContactController = async (req, res) => {
    const {id} = req.params;
    const userId = req.user._id;
    const data = await updateContact(id, userId, req.body)

    res.status(200).json({
        status: 200,
        message: "Successfully upserted contact!",
        data,
    })
}

export const patchContactController = async (req, res) => {
    const {id} = req.params;
    let photo = null;
    const userId = req.user._id;
    if (req.file) {
        // photo = await saveFileToLocal(req.file);
        photo = await saveToCloudinary(req.file);
    }

    const data = await updateContact(id, userId, {...req.body, photo});

    if (!data) {
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
    const userId = req.user._id;

    const data = await deleteContact(id, userId);

    if (!data) {
        throw createHttpError(404, `Contact not found`);
    }

    res.status(204).json({
        status: 204,
        message: "Successfully deleted contact!",
        data,
    })
}