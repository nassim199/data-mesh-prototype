const mongoose = require('mongoose');

const Schema = mongoose.Schema;

FolderSchema = new Schema({
    nom: {
        type: String
    },
    // parent: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Folder'
    // },
    children: [{
        type: Schema.Types.ObjectId,
        ref: 'Folder'
    }],
    dataProducts: [{
        type: Schema.Types.ObjectId,
        ref: 'DataProduct'
    }]
})

var autoPopulateChildren = function(next) {
    this.populate('children');
    this.populate('dataProducts');
    next();
};

FolderSchema
.pre('findOne', autoPopulateChildren)
.pre('find', autoPopulateChildren)

module.exports = mongoose.model('Folder', FolderSchema);