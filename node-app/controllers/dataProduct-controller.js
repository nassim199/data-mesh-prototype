var DataProduct = require("../models/dataProduct");

exports.createDP = async (req, res) => {
  const dataProduct = new DataProduct({
    nom: req.body.nom,
    description: req.body.description,
    formatData: req.body.formatData,
    dateIngestion: req.body.dateIngestion,
    link: req.body.link,
    owner: req.acteur._id
});

dataProduct.save((err, dp) => {
    if (err) {
        res.status(500).send({message: err});
        return;
    } else {
        req.acteur.dataProducts.push(dp._id);
        req.acteur.save((err, acteur) => {
            if (err) {
                res.status(500).send({message: err});
                return;
            } else {
                res.status(200).send({message: "data product created successfully"});
            }});
    }
  });
};

