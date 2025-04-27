import {model, Schema} from "mongoose";
import {handleServerError, setUpdateSettings} from "./hooks.js";
import {emailRegex} from "../../constants/auth.js";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        match: emailRegex,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    verify: {
        type: Boolean,
        default: false,
        required: true,
    },
}, {
    versionKey: false,
    timestamps: true,
})

userSchema.post('save', handleServerError);
userSchema.pre('findOneAndUpdate', setUpdateSettings)
userSchema.post('findOneAndUpdate', handleServerError);

const UserCollection = model('user', userSchema);

export default UserCollection;