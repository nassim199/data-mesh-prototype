const jwt = require("jsonwebtoken");
const Acteur = require("../models/acteur");

const verifyToken = (req, res, next) => {
  if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
    
    jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
      if (err) req.acteur = undefined;
      Acteur.findOne({
          _id: decode.id
        })
        .exec((err, acteur) => {
          if (err) {
            
            res.status(500)
              .send({
                message: err
              });
          } else {
            req.acteur = acteur;
            next();
          }
        })
    });
  } else {
    req.acteur = undefined;
    next();
  }
};
module.exports = verifyToken;