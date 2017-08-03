var request = require('request');
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

console.log(fundList[1]);
console.log(fundName[1]);
console.log(fundSym[1]);

url = 'https://www.google.com/finance/historical?q=MUTF_IN%3AHDFC_LIQU_DIR_1SY277O&startdate=Aug+1%2C+2001&enddate=Aug+2%2C+2017&noIL=1&num=30000&ei=O6iBWZitGI67ugS8vYeQBw';
fundName = '';
startDate = '';
endDate = '';
url = 'https://www.google.com/finance/historical?q='+fundName+'&startdate='+startDate+'&enddate='+endDate+'&noIL=1&num=30000';
