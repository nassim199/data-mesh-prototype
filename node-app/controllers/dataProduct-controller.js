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

exports.getAllDPs = async (req, res) => {
    try {
        let dataProducts = await DataProduct.find().populate({ path: 'owner', select: 'nom' });
    
        res.status(201).json({
          message: 'get all data products successful',
          dataProducts
        });
      } catch (err) {
        console.log(err);
      }
  };
  
const AWS = require('aws-sdk');
//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
 
exports.upload_data = async (req, res) => {
  const dp_id = req.params.dp_id;

  dp = await DataProduct.findOne({
      _id: dp_id
    }).populate({ path: 'owner', select: 'nom' });

  // Create S3 service object
  const s3 = new AWS.S3({ });

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {Bucket: dp.owner.nom, Key: `${dp.nom}.${dp.formatData}`, Body: ''};

  uploadParams.Body = req.file.buffer;
  //uploadParams.Key = req.file.originalname;
  //call S3 to retrieve upload file to specified bucket
  s3.upload (uploadParams, function (err, data) {
    if (err) {
      console.log("Error", err);
      res.status(500).send(err);
    } if (data) {
      console.log("Upload Success", data.Location);
      res.status(200).send({message:"file sent"});
    }
  });
}

exports.get_data = async (req, res) => {
  const dp_id = req.params.dp_id;
  
  dp = await DataProduct.findOne({
      _id: dp_id
    }).populate({ path: 'owner', select: 'nom' });
    
  const s3 = new AWS.S3({ });

  var params = {Bucket: dp.owner.nom, Key: `${dp.nom}.${dp.formatData}`};

  s3.getObject(params, function (err, data) {
    if (err) {
      console.log(err);
      res.status(200);
      res.end('Error Fetching File');
    }
    else {
      res.attachment(params.Key); // Set Filename
      res.type(data.ContentType); // Set FileType
      res.send(data.Body);        // Send File Buffer
    }
  });
};

//convert from json to csv
const { Parser } = require('json2csv');
exports.test_csv = async (req, res) => {
  const s3 = new AWS.S3({ });

  var params = { Bucket: "acteur1", Key: "tcl_sytral.tclarret.json" };

  s3.getObject(params, function (err, data) {
    if (err) {
      console.log(err);
      res.status(200);
      res.end('Error Fetching File');
    }
    else {
      //res.attachment(params.Key); // Set Filename
      res.attachment("tcl_sytral.tclarret.csv")
      //res.type(data.ContentType); // Set FileType
      res.type('text/csv')
      json_data = JSON.parse(data.Body);

      const json2csv = new Parser({ fields: json_data["fields"] })
      data_csv = json2csv.parse(json_data["values"]);
      res.send(data_csv);        // Send File Buffer
    }
  });
};

const {PythonShell} = require('python-shell');

exports.test_python = async (req, res) => {

  let options = {
    mode: 'json',
    //pythonPath: 'path/to/python',
    //pythonOptions: ['-u'], // get print results in real-time
    //scriptPath: '../',
    args: [process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, req.query.sql]
  };
  
  PythonShell.run('../pandas_sql.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution

    res.status(200).send(results);
  });
}