const mongoose = require('mongoose');

const Schema = mongoose.Schema;

dataProductSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    folder: {
        type: Schema.Types.ObjectId,
        ref: 'Folder'
    },
    description: {
        type: String,
        required: true
    },
    formatData: {
        type: String,
        required: true
    },
    dateCreation: {
        type: Date,
        required:true
    },
    derniereMAJ: {
        type: Date
    },
    volume: {
        type: Number
    },
    downloads: [{
        type: Date
    }],
    dataAvailable:{
        type: Boolean,
        default: false
    },
    isExternal: {
        type: Boolean
    },
    externalSourceLink: {
        type: String
    },
    dataLineage: [{
        type: Schema.Types.ObjectId,
        ref: 'DataProduct'
    }],
    hasNotebook: {
        type: Boolean
    },
    notebookId: {
        type: String
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'Acteur'
    }
})

module.exports = mongoose.model('DataProduct', dataProductSchema);