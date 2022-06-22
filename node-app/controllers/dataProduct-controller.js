var DataProduct = require("../models/dataProduct");
var Folder = require("../models/folder");
var mongoose = require('mongoose');

exports.createDP = async (req, res) => {
  //const folderId = req.body.folderId
  //TODO: add product to appropriate folder and not root folder
  const folderId = req.acteur.folder

  const dataProduct = new DataProduct({
    nom: req.body.nom,
    folder: folderId,
    description: req.body.description,
    formatData: req.body.formatData,
    dateIngestion: req.body.dateIngestion,
    owner: req.acteur._id
  });
  

  dataProduct.save(async (err, dp) => {
    if (err) {
        res.status(500).send({message: err});
        return;
    } else {
        try {
          await Folder.collection.updateOne(
              { _id: mongoose.Types.ObjectId(folderId) },
              { $addToSet: { dataProducts: mongoose.Types.ObjectId(dp._id)}  } 
          );
          res.status(200).send({message: "data product created successfully"});
          } catch (err) {
            res.status(500).json({
              message: 'Data product not attached to its parent'
            });
            console.log(err);
        }
    }
  });
};

exports.getAllDPs = async (req, res) => {
    try {
        let dataProducts = await DataProduct.find().populate({ path: 'owner', select: 'nom' });
    
        res.status(201).json({
          message: 'get all data products successful',
          dataProducts
        });
      } catch (err) {
        console.log(err);
        res.status(500).json({
          message: 'get all data products not successful'
        });
      }
  };
  
exports.getMyDPs = async (req, res) => {
  let folderId = req.acteur.folder;

  try {
    
    tree = await Folder.findById(folderId)

    res.status(201).json({
      message: 'get my data products successful',
      tree: tree
    });
  } catch (err) {
    res.status(500).json({
      message: 'get all data products not successful'
    });
    console.log(err);
  }
}  

exports.getDP = async (req, res) => {
  let dpId = req.params.dp_id;
  try {
    
    dp = await DataProduct.findById(dpId).populate({ path: 'owner', select: 'nom' });

    res.status(201).json({
      message: 'get data product successful',
      dataProduct: dp
    });
  } catch (err) {
    res.status(500).json({
      message: 'get data product not successful'
    });
    console.log(err);
  }
}

exports.createFolder = async (req, res) => {
  const parentFolderId = req.body.folderId
  const parentFolder = await Folder.collection.findOne({ _id: mongoose.Types.ObjectId(parentFolderId) })
  const path = parentFolder.path + req.body.nom + "/"
  const folder = new Folder({
      nom: req.body.nom,
      path: path
  });
  //TODO: Verify user
  
  folder.save(async (err, f) => {
      if (err) { res.status(500).send({message: err}); return;
      } else {
          try {
          await Folder.collection.updateOne(
              { _id: mongoose.Types.ObjectId(parentFolderId) },
              { $addToSet: { children: mongoose.Types.ObjectId(f._id)}  } 
          );
          res.status(200).send({message: "Folder created successfully"});
          } catch (err) {
            res.status(500).json({
              message: 'Folder not attached to its parent'
            });
            console.log(err);
          }
      }
    }
  );  
}
