var request = require('request');
const cheerio = require('cheerio');
var Promise = require('bluebird');  
var fs = require('fs');  
Promise.promisifyAll(fs);

var request = Promise.promisify(require("request"), {multiArgs: true});
Promise.promisifyAll(request, {multiArgs: true});
var http = require('http');

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
frmdt="01-Apr-2014";
todt="01-Aug-2017";
mf=22;
src="http://portal.amfiindia.com/DownloadNAVHistoryReport_Po.aspx?mf="+mf+"&frmdt="+frmdt+"&todt="+todt;
console.log(src);
//src=url;
userAgents = readtoArray('UserAgents.txt'); //importing the user-agents
lines=[];

var options = {  
  url: src,
  proxy: proxy, //'http://' + proxyList[getRandomInt(0,25)], //proxy,
  //headers: {'User-Agent': userAgents[getRandomInt(0,25)].replace(/"/g,'').trim()},
  }



var req = http.get(options);
req.on('connect', function(res) {
     res.pipe(fs.createWriteStream('nav.csv'));
});