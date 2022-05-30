const mongoose = require('mongoose');

const Schema = mongoose.Schema;

dataProductSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    formatData: {
        type: String,
        required: true
    },
    dateIngestion: {
        type: Date,
        required:true
    },
    link: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Acteur'
    }
})

module.exports = mongoose.model('DataProduct', dataProductSchema);