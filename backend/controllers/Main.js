const express = require('express')
var router = express.Router()
var multer = require('multer')
var uniqid = require('uniqid')
var ObjectID= require('mongoose').Types.ObjectId

var { Product } = require('../models/Product')

router.get('/',(req,res)=>{
  Product.find((err,docs)=>{
      if(!err){
          res.send(docs)
      }else{
          console.log(JSON.stringify(err,undefined,2))
      }
  })
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, 'public/upload')
},
filename: function (req, file, cb) {
  cb(null, uniqid() + '-' +file.originalname )
}
})

var upload = multer({ storage: storage }).single('file')

router.post('/',function(req, res) {

  upload(req, res, function (err) {
         if (err instanceof multer.MulterError) {
             return res.status(500).json(err)
         } else if (err) {
             return res.status(500).json(err)
         }
    setTimeout(function() {
          
    return res.status(200).send(req.file)
        
    }, 3000);

  })

})

module.exports = router