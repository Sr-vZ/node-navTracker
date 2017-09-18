var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    //res.end("test");
    //console.log(__dirname)
    fs.readFile('/','googMFsym.csv',function(data,err){
        if(err){
            console.log(err)
        }
        res.write(JSON.stringify(data));
    });
})


module.exports = router;