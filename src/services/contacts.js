import ContactCollection from "../db/models/Contacts.js";
import {calcPaginationData} from "../utils/calcPaginationData.js";
import {sortList} from "../constants/index.js";

export const getContacts = async ({page = 1, perPage = 10, sortBy = '_id', sortOrder = sortList[0], filters = {}}) => {
    const skip = (page - 1) * perPage;
    console.log(filters)
    const query = {};

    if (filters.minYearsOld) {
        query.age = {...query.age, $gte: filters.minYearsOld};
    }

    if (filters.maxYearsOld) {
        query.age = {...query.age, $lte: filters.maxYearsOld};
    }

    if (filters.isFavourite) {
        query.isFavourite = {...query.isFavourite, $eq: filters.isFavourite};
    }

    if (filters.contactType) {
        query.contactType = {...query.contactType, $eq: filters.contactType};
    }

    const items = await ContactCollection.find(query)
        .skip(skip)
        .limit(perPage)
        .sort({[sortBy]: sortOrder});

    const totalItems = await ContactCollection.countDocuments(query);

    const paginationData = calcPaginationData({page, perPage, totalItems});

    return {
        data: items, page, perPage, totalItems, ...paginationData,
    };
}

export const getContactById = (id) => ContactCollection.findOne({_id: id})

export const addContact = (payload) => ContactCollection.create(payload)

export const updateContact = async (_id, payload, options = {}) => {
    const {upsert = false} = options
    const result = await ContactCollection.findByIdAndUpdate({_id}, payload, {
        new: true, upsert, runValidators: true
    })

    return result
}

export const deleteContact = async (_id) => ContactCollection.findByIdAndDelete({_id})