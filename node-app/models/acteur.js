const mongoose = require('mongoose');

const Schema = mongoose.Schema;

acteurSchema = new Schema({
    nom: {
        type: String,
        required: true
    },
    dataProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'DataProduct'
    }]
})

module.exports = mongoose.model('Acteur', acteurSchema);