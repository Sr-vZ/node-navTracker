var request = require('request');
var rp = require('request-promise');
const cheerio = require('cheerio');
var fs = require('fs');
var _ = require('lodash');

var log = require('single-line-log').stdout;
const chalk = require('chalk');

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

fundList = readtoArray('./data/googMFsym.csv');
var fundName = [],
    fundSym = [];

for(i=0;i<fundList.length;i++){
    fundName[i] = fundList[i] .toString().trim().split(',')[0];
    fundSym[i] = fundList[i] .toString().trim().split(',')[1];
}

userAgents = readtoArray('UserAgents.txt');
//console.log(fundList[1]);
//console.log(fundName[1]);
//console.log(fundSym[1]);

proxy = 'http://proxy.intra.bt.com:8080';
url = 'https://www.google.com/finance/historical?q=MUTF_IN%3AHDFC_LIQU_DIR_1SY277O&startdate=Aug+1%2C+2001&enddate=Aug+2%2C+2017&noIL=1&num=30000&ei=O6iBWZitGI67ugS8vYeQBw';
//https://www.google.com/finance/historical?q=MUTF_IN:HDFC_LIQU_DIR_1SY277O&startdate=Aug+1,+2001&enddate=Aug+2,+2017&noIL=1&num=30000&ei=O6iBWZitGI67ugS8vYeQBw
fund = fundSym[getRandomInt(1,200)];
startDate = 'Aug 1, 2010';
endDate = 'Aug 2, 2017';
url = 'https://www.google.com/finance/historical?q=MUTF_IN%3A'+fund+'&startdate='+startDate+'&enddate='+endDate+'&noIL=1&num=30000&ei=O6iBWZitGI67ugS8vYeQBw';
//url = encodeURI(url);
url1 = 'https://www.google.com/finance/historical?q=MUTF_IN:'+fund+'&startdate='+startDate+'&enddate='+endDate+'&noIL=1&num=30000';
console.log(url);
console.log(encodeURI(url1));

var options = {  
  uri: url,
  proxy: proxy, //'http://' + proxyList[getRandomInt(0,25)], //proxy,
  headers: {'User-Agent': userAgents[getRandomInt(0,25)].replace(/"/g,'').trim()},
  transform: function (body, response, resolveWithFullResponse) {
        return body;
    }
}

rp(options)
    .then(function(body){
        $ = cheerio.load(body);
        navtable = $('#prices');
        //gf-table historical_price
        //console.log(body);
        console.log(navtable.text());
        fs.writeFile('googNavop.txt',navtable.text(),function(err){
            console.log('file saved!');
        });
    })
    .catch(function(error){
        //console.log(error);
        fs.appendFile('errorlog.txt',error.toString(),function(err){
            console.log('Error!');
        });
    })