import ContactCollection from "../db/models/Contacts.js";

export const getContacts = () => ContactCollection.find();

export const getContactById = (id) => ContactCollection.findOne({_id: id})

export const addContact = (payload) => ContactCollection.create(payload)

export const updateContact = async (_id, payload, options ={}) => {
    const {upsert = false} = options
    const result = await ContactCollection.findByIdAndUpdate({_id}, payload, {
        new: true,
        upsert
    })

    return result
}

export const deleteContact = async (_id) => ContactCollection.findByIdAndDelete({_id})