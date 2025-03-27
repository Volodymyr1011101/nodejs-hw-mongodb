import mongoose, {Schema, model} from "mongoose";

const movieSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    director:{
        type: String,
        required: true
    }
})

const MovieCollection = mongoose.model('movie',movieSchema);

export default MovieCollection;