import {model, Schema} from "mongoose";
import {handleServerError, setUpdateSettings} from "./hooks.js";

const sessionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    accessToken: {
        type: String,
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
    },
    accessTokenValidUntil: {
        type: Date,
        required: true,
    },
    refreshTokenValidUntil: {
        type: Date,
        required: true,
    },
}, {timestamps: true, versionKey: false});

sessionSchema.post('save', handleServerError);
sessionSchema.pre('findOneAndUpdate', setUpdateSettings)
sessionSchema.post('findOneAndUpdate', handleServerError);

const SessionCollection = model('session', sessionSchema);

export default SessionCollection;