var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  fs.readFile( __dirname + "data/" + "googMFsym.csv", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})


module.exports = router;