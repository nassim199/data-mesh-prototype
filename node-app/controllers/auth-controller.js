var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Acteur = require("../models/acteur");

const AWS = require('aws-sdk');
//configuring the AWS environment
AWS.config.update({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});
exports.signup = async (req, res) => {
  const acteur = new Acteur({
    nom: req.body.nom,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8)
  });

  var s3 = new AWS.S3();
  var bucketParams = {
    Bucket : req.body.nom
  };

  // call S3 to create the bucket
  s3.createBucket(bucketParams, function(err, data) {
    if (err) {
      console.log("Error", err);
      res.status(201).json({
        message: 'fail',
      });
    } else {
      console.log("Success", data.Location);

      //if bucket created save acteur
      acteur.save((err, acteur) => {
        if (err) {
          res.status(500)
            .send({
              message: err
            });
          return;
          //TODO: if fail delete created bucket
        } else {
          res.status(200)
            .send({
              message: "acteur register successfully"
            })
        }
      });
    }
  });
};

exports.signin = async (req, res) => {

  Acteur.findOne({
      email: req.body.email
    })
    .exec((err, acteur) => {
      if (err) {
        res.status(500)
          .send({
            message: err
          });
        return;
      }
      if (!acteur) {
        return res.status(404)
          .send({
            message: "acteur Not found."
          });
      }

      //comparing passwords
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        acteur.password
      );
      // checking if password was valid and send response accordingly
      if (!passwordIsValid) {
        return res.status(401)
          .send({
            accessToken: null,
            message: "Invalid Password!"
          });
      }
      //signing token with acteur id
      var token = jwt.sign({
        id: acteur.id
      }, process.env.API_SECRET, {
        expiresIn: 86400
      });

      //responding to client request with acteur profile success message and  access token .
      res.status(200)
        .send({
          acteur: {
            id: acteur._id,
            email: acteur.email,
            fullName: acteur.fullName,
          },
          message: "Login successfull",
          accessToken: token,
        });
    });

};