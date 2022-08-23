var DataProduct = require("../models/dataProduct");
var Folder = require("../models/folder");
var mongoose = require('mongoose');
const axios = require('axios');

exports.createDP = async (req, res) => {
  let folderId = req.body.selectedFolder;
  const dataProduct = new DataProduct({
    nom: req.body.nom,
    folder: folderId,
    description: req.body.description,
    formatData: req.body.formatData,
    dateCreation: req.body.dateCreation,
    isExternal: req.body.isExternal,
    externalSourceLink: req.body.externalSourceLink,
    dataLineage: req.body.selectedIds,
    hasNotebook: req.body.checked,
    notebookId: "",
    owner: req.acteur._id
  });

  let dp_save = async (err, dp) => {
    if (err) {
        console.log(err)
        res.status(500).send({message: err});
        return;
    } else {

      await Folder.collection.updateOne(
          { _id: mongoose.Types.ObjectId(folderId) },
          { $addToSet: { dataProducts: mongoose.Types.ObjectId(dp._id)}  } 
      );
      res.status(200).send({message: "data product created successfully"});
    }
  };

  try {
    if (req.body.checked) {
      let folder = await Folder.collection.findOne({ _id: mongoose.Types.ObjectId(folderId) });
      axios({
        method: 'post',
        url:  process.env.ZeppelinLink + 'notebook',
        data: {
          name: `${req.acteur.nom}/${folder.path}${req.body.nom}`,
          paragraphs: [
            {title: "title 1", text: `%python\n${req.body.selectedIds.map((id,i) => `dp${i}_url = "http://10.70.10.254:3000/dp/${id}/get_data"`).join('\n')}`}
          ]
        }
      })
      .then((res) => {
        dataProduct.notebookId = res.data.body;

        dataProduct.save(dp_save);
      })
      .catch((error) => console.log(error));
    } else {
      dataProduct.save(dp_save);
    }

  } catch (err) {
    res.status(500).json({
      message: 'Data product not attached to its parent'
    });
    console.log(err);
  } 
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
    //TODO: implement through a recursive function
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

async function past_dps(dp_id, parent) {
  try {
    let dp = await DataProduct.findById(dp_id);
    let dp_lineage = [{
        id: dp._id,
        key: dp.nom,
        parent: parent
      }]

    for (let i = 0; i < dp.dataLineage.length; i++) {
      const id = dp.dataLineage[i];
      let temp_dp_lineage = await past_dps(id, dp.nom)
      dp_lineage = [...dp_lineage,...temp_dp_lineage]
    }

    return dp_lineage;
  } catch (err) {

    console.log(err);
  } 
}
exports.getDataLineage = async (req, res) => {
  let dpId = req.params.dp_id;
  try {
    dp_lineage = await past_dps(dpId, "");
    res.status(201).json({
      message: 'get data product lineage successful',
      data_lineage: dp_lineage
    });
    
  } catch (err) {
    res.status(500).json({
      message: 'Error getting data lineage'
    });
    console.log(err);
} 
}