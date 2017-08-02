var request = require('request');
const cheerio = require('cheerio');
var Promise = require('bluebird');  
var fs = require('fs');  
Promise.promisifyAll(fs);
//var sys = require('sys');
var progress = require('request-progress');

//var request = Promise.promisify(require("request"), {multiArgs: true});
//Promise.promisifyAll(request, {multiArgs: true});

var _ = require('lodash');
//var async = require('async');
//extractor = require('unfluff');
const rp = require('request-promise');  
var log = require('single-line-log').stdout;
const chalk = require('chalk');

src = 'https://www.amfiindia.com/spages/NAVAll.txt?t=27072017122549'
var proxy='http://proxy.intra.bt.com:8080';

//this function transfers the file contents to an array which can be looped
function readtoArray(fileLoc,arr){
  if(fileLoc.toString().indexOf('json')!==-1){
    data = fs.readFileSync(fileLoc,'utf8');
    data.toString().replace('[','').replace(']','').split(',');
    for (i in data){
      arr=data[i];
    }
    return arr;
  }
	data = fs.readFileSync(fileLoc,'utf8');
  arr = data.toString().split("\n");
  return arr;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
url="http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf=22&frmdt=01-Apr-2017&todt=30-Apr-2017"
frmdt="01-Apr-2011";
todt="01-Aug-2017";
mf=22;
src="http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf="+mf+"&frmdt="+frmdt+"&todt="+todt;
console.log(src);
//src=url;
userAgents = readtoArray('UserAgents.txt'); //importing the user-agents
lines=[];

var options = {  
  uri: src,
  proxy: proxy, //'http://' + proxyList[getRandomInt(0,25)], //proxy,
  //headers: {'User-Agent': userAgents[getRandomInt(0,25)].replace(/"/g,'').trim()},
  transform: function (body, response, resolveWithFullResponse) {
        return body;
    }
}

/* rp.get(options)
  .then(function (body){
      $ = cheerio.load(body);
      //links = $('a'); //jquery get all hyperlinks
      //console.log(body)
      //ls = _.uniq(ls);
      lines=body.toString().split('\n');
      
      console.log(lines.length,' Remote data received! Processing...');
      fs.writeFileSync('./data/nav.csv',''); //deleting the contents of the file
      
      for(i=0;i<lines.length;i++){
          log('writing: '+lines[i]);
          //if()
          fs.appendFile('./data/nav.csv',lines[i].toString().replace(/;/g,','),'utf-8',function(err){
            if(err){
              console.log('file writing error!' + err);
            }              
            console.log('File saved!');
          });
          //fs.close('./data/nav.csv');
      }   
         fs.writeFile('./data/nav.csv',body.toString().replace(/;/g,','),function(err){
        if(err){
              console.log('file writing error!' + err);
            }              
            console.log('File saved!');
      })
  })
  .catch(function(e){
    console.log(e);
  })
 */

/* var writeStream = fs.createWriteStream('nav.csv');
request({'url':url,'proxy':proxy}, function(err, res) {
    writeStream.pipe(res,function() {
    //res.end({"status":"Completed"});
    console.log('file saved!');
  });
    
}); */

/* var filename = 'navtest1.txt';
var dlprogress = 0;

 var stream = request
  .get({'url':url,'proxy':proxy})
  .on('error', function(err) {
    console.log(err)
  })
  .on('response',function(response){
    //console.log(resp.toString().length);
        var downloadfile = fs.createWriteStream(filename, {'flags': 'a'});
        console.log("File size " + filename + ": " + response.headers['content-length'] + " bytes.");
        response.addListener('data', function (chunk) {
            dlprogress += chunk.length;
            downloadfile.write(chunk, encoding='binary');
        });
        response.addListener("end", function() {
            downloadfile.end();
            console.log("Finished downloading " + filename);
        });
  })
  .pipe(fs.createWriteStream('navtest.txt')) 

stream.on('finish', function () {
  console.log('file saved!');
});
 request({'url':url,'proxy':proxy},function(err,res){
  if(err){
    console.log(err);
  }
  res.on('finish',function(){
    res.pipe(fs.createWriteStream('navtest.txt'));
  })
}); 

request.on('response', function (response) {
        var downloadfile = fs.createWriteStream(filename, {'flags': 'a'});
        sys.puts("File size " + filename + ": " + response.headers['content-length'] + " bytes.");
        response.addListener('data', function (chunk) {
            dlprogress += chunk.length;
            downloadfile.write(chunk, encoding='binary');
        });
        response.addListener("end", function() {
            downloadfile.end();
            sys.puts("Finished downloading " + filename);
        });

}); */
var googleFin = 'https://www.google.com/finance?q=%5B%28exchange+%3D%3D+%22MUTF_IN%22%29%5D&ei=vo2BWcGcNY22uATRooyQBQ';

progress(request({'url':url,'proxy':proxy,timeout: 12000}),{
    throttle: 2000,                    // Throttle the progress event to 2000ms, defaults to 1000ms 
    delay: 1000,                       // Only start to emit after 1000ms delay, defaults to 0ms 
    //lengthHeader: 'x-transfer-length'  // Length header to use, defaults to content-length 
    })
    .on('error',function(err){
      console.log(err);
    })
    .on('progress', function (state) {
    // The state is an object that looks like this: 
    // { 
    //     percent: 0.5,               // Overall percent (between 0 to 1) 
    //     speed: 554732,              // The download speed in bytes/sec 
    //     size: { 
    //         total: 90044871,        // The total payload size in bytes 
    //         transferred: 27610959   // The transferred payload size in bytes 
    //     }, 
    //     time: { 
    //         elapsed: 36.235,        // The total elapsed seconds since the start (3 decimals) 
    //         remaining: 81.403       // The remaining seconds to finish (3 decimals) 
    //     } 
    // } 
    log(console.log('progress', state));
    })
    .on('end', function () {
    // Do something after request finishes
      console.log('file saved!');
    })
    .pipe(fs.createWriteStream('nav.csv'))
