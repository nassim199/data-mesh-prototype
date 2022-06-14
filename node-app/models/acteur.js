const mongoose = require('mongoose');

const Schema = mongoose.Schema;

acteurSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: [true, "email already exists in database!"],
        lowercase: true,
        trim: true,
        required: [true, "email not provided"],
        validate: {
            validator: function (v) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
        }
    },
    password: {
        type: String,
        required: true
    },
    // dataProducts: [{
    //     type: Schema.Types.ObjectId,
    //     ref: 'DataProduct'
    // }],
    folder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder'    
    }
})

module.exports = mongoose.model('Acteur', acteurSchema);