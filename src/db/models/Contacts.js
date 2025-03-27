import { Schema, model } from "mongoose";

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
        required: true,
    },
    isFavorite: {
        type: Boolean,
        required: true,
    },
    contactType: {
        type: String,
        required: true,
    }
})

const ContactCollection = model("contact", contactSchema);

export default ContactCollection;