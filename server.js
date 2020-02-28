// this file is for currency converter server side 
//author: Meng Yan
//date:02/27/2020

var express = require("express");               
var bodyParser = require("body-parser"); 
const app = express();
var https = require('https');
const cors = require('cors')
app.use(cors())
var infoMap = {};
var parseString = require('xml2js').parseString;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

var url = "https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml"

// read xml file and convert to json formate
function xmlToJson(url, callback) {
    var req = https.get(url, function(res) {
      var xml = '';
      
      res.on('data', function(chunk) {
        xml += chunk;
      });
  
      res.on('error', function(e) {
        callback(e, null);
      }); 
  
      res.on('timeout', function(e) {
        callback(e, null);
      }); 
  
      res.on('end', function() {
        parseString(xml, function(err, result) {
          callback(null, result);
        });
      });
    });
  }

/* save xml currency name and rate into infoMap object, get rates from infoMap based on base & target currency. 
  do calculation based use callback to pass final result
*/
  function calculate(base_amount,base_currency,target_currency, callback)
  {

      xmlToJson(url, function(err, xmlData) {
        if (err) {

          return console.err(err);
        }

        //console.log(JSON.stringify(xmlData, null, 2));

        let arrayofCurrencyObject = xmlData["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"];
        //console.log('arr ' ,arr);
        for(let i = 0 ; i < arrayofCurrencyObject.length; i++)
        {
            let currencyObj = arrayofCurrencyObject[i]['$']
            let currencyName = currencyObj.currency
            let currencyValue = currencyObj.rate
            infoMap[currencyName] = currencyValue;

         }

        let baseRate  = infoMap[base_currency]
        //console.log("baseRate is " + baseRate)
        let targetRate = infoMap[target_currency]
        //console.log('targetRate ' ,  targetRate)
        let result = base_amount * targetRate/baseRate
        callback(result);
      })
  }


  //get currency list from xml file dynamically 
  function getLatestCurrencyList(callback){
    xmlToJson(url, function(err, xmlData) {
      if (err) {

        return console.err(err);
      }

     let keys = []

      let arr = xmlData["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"];
      //console.log('arr ' ,arr);
      for(let i = 0 ; i < arr.length; i++)
      {
        let obj = arr[i]['$']
        let currencyName = obj.currency
        keys.push(currencyName)
      }
      console.log('--------keys ',keys)
      callback(keys);
    })
  }


  // get  currecny information and sent to drop list in front-end
  app.get("/api/currencyKeys",(req,res)=>{
    getLatestCurrencyList(function(result){

      res.status(200);
      res.json(result);
      res.end();
    })

  })



  // get data from users input, check request , call calculate function and send response to front end 
  app.get("/api/convert",(req,res)=>{

    res.set('Content-Type', 'application/json');
    console.log('----------req ',req)
    if(req.query.base_amount== null ||req.query.base_currency==null || req.query.target_currency==null)
    {
      console.log("req miss some query")
      res.status(400);
      res.json({status: 400, message:"req miss some query" });
      res.end()

    }
    console.log('----------req ',req.query)
  
    let base_currency = req.query.base_currency;
    let base_amount = req.query.base_amount;
    let target_currency = req.query.target_currency;
  

    // calculate(base_amount,base_currency,target_currency).then((result)=>{console.log(result)});
    calculate(base_amount,base_currency,target_currency, function(result){
      console.log('=======res  ' ,  result);
  
      res.status(200);
      res.json({target_currency: target_currency, target_amount: result});
      res.end();
  
    })
  
  })

const port = process.env.PORT || 8080;
app.listen(8080, () => {
 console.log('Running on port ' + port);
});