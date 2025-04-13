import {model, Schema} from "mongoose";
import {typeList} from "../../constants/contacts.js";
import {handleServerError, setUpdateSettings} from "./hooks.js";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    isFavourite: {
        type: Boolean,
        default: false,
    },
    contactType: {
        type: String,
        enum: typeList,
        default: 'personal',
    },
}, {timestamps: true});

contactSchema.post('save', handleServerError);
contactSchema.pre('findOneAndUpdate', setUpdateSettings)
contactSchema.post('findOneAndUpdate', handleServerError);
export const contactsSortFields = ['name', 'phoneNumber', 'email', 'isFavourite', 'contactType', 'age'];

const ContactCollection = model("contact", contactSchema);

export default ContactCollection;