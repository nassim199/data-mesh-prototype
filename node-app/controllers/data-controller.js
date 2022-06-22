var DataProduct = require("../models/dataProduct");
var mongoose = require('mongoose');
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
    }).populate({ path: 'owner', select: 'nom' })
    .populate({ path: 'folder', select: 'path'});

  // Create S3 service object
  const s3 = new AWS.S3({ });

  // call S3 to retrieve upload file to specified bucket
  var uploadParams = {Bucket: dp.owner.nom, Key: `${dp.folder.path}${dp.nom}.${dp.formatData}`, Body: ''};

  uploadParams.Body = req.file.buffer;
  dp.valume = req.file.size;
  await DataProduct.updateOne({_id: dp_id}, {
    volume: req.file.size,
    derniereMAJ: Date.now(),
    dataAvailable: true
  })

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
    }).populate({ path: 'owner', select: 'nom' })
    .populate({ path: 'folder', select: 'path'});
    
  const s3 = new AWS.S3({ });

  var params = {Bucket: dp.owner.nom, Key: `${dp.folder.path}${dp.nom}.${dp.formatData}`};

  s3.getObject(params, function (err, data) {
    if (err) {
      console.log(err);
      res.status(500);
      res.end('Error Fetching File');
    }
    else {
      res.attachment(params.Key); // Set Filename
      res.type(data.ContentType); // Set FileType
      res.send(data.Body);        // Send File Buffer
      
      DataProduct.collection.updateOne(
        { _id: mongoose.Types.ObjectId(dp_id) },
        { $addToSet: { downloads: Date.now()}  } 
      );
    }
  });
};

//convert from json to csv
// const { Parser } = require('json2csv');
// exports.test_csv = async (req, res) => {
//   const s3 = new AWS.S3({ });

//   var params = { Bucket: "acteur1", Key: "tcl_sytral.tclarret.json" };

//   s3.getObject(params, function (err, data) {
//     if (err) {
//       console.log(err);
//       res.status(200);
//       res.end('Error Fetching File');
//     }
//     else {
//       //res.attachment(params.Key); // Set Filename
//       res.attachment("tcl_sytral.tclarret.csv")
//       //res.type(data.ContentType); // Set FileType
//       res.type('text/csv')
//       json_data = JSON.parse(data.Body);

//       const json2csv = new Parser({ fields: json_data["fields"] })
//       data_csv = json2csv.parse(json_data["values"]);
//       res.send(data_csv);        // Send File Buffer
//     }
//   });
// };

const {PythonShell} = require('python-shell');
const { Parser } = require('node-sql-parser');


exports.sql_query = async (req, res) => {
  const sql = req.query.sql;

  const parser = new Parser();
  const tables = parser.astify(sql)[0]["from"].map(t => t.table); // mysql sql grammer parsed by default

  // TODO: avoid full population of folder (same in get & upload dps)
  // solution 1: use native mongodb
  // solution 2: add path to data product
  const dps = await DataProduct.find({ 
    'nom': { $in: tables } 
  }).populate({ path: 'owner', select: 'nom' })
    .populate({ path: 'folder', select: 'path'});

  
  let args = [process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY, req.query.sql, ...dps.map(dp => dp.owner.nom), ...dps.map(dp => dp.nom), ...dps.map(dp => `${dp.folder.path}${dp.nom}.${dp.formatData}`)]
  
  let options = {
    mode: 'json',
    //pythonPath: 'path/to/python',
    //pythonOptions: ['-u'], // get print results in real-time
    //scriptPath: '../',
    args: args
  };
  
  PythonShell.run('./pandas_sql.py', options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution

    res.status(200).send(results);
  });
  
}