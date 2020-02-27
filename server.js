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





  function calculate(base_amount,base_currency,target_currency, callback)
  {

      xmlToJson(url, function(err, data) {
        if (err) {

          return console.err(err);
        }

        //console.log(JSON.stringify(data, null, 2));

        let arr = data["gesmes:Envelope"]["Cube"][0]["Cube"][0]["Cube"];
        //console.log('arr ' ,arr);
        for(let i = 0 ; i < arr.length; i++)
        {
            let obj = arr[i]['$']
            let currencyName = obj.currency
            let currencyValue = obj.rate
            infoMap[currencyName] = currencyValue;

         }




        let baseRate  = infoMap[base_currency]
        console.log("baseRate is " + baseRate)
        let targetRate = infoMap[target_currency]
        console.log('targetRate ' ,  targetRate)
        let result = base_amount * targetRate/baseRate
        callback(result);
      })
  }




  
  app.get("/api/convert",(req,res)=>{

    res.set('Content-Type', 'application/json');
    console.log('----------req ',req.query)
    console.log('----------req ',req.query.base_currency)
  
    let base_currency = req.query.base_currency;
    let base_amount = req.query.base_amount;
    let target_currency = req.query.target_currency;
  
    // calculate(base_amount,base_currency,target_currency).then((result)=>{console.log(result)});
    calculate(base_amount,base_currency,target_currency, function(result){
      console.log('===========res  ' ,  result);
  
      res.status(200);
      res.json({target_currency: target_currency, target_amount: result});
      res.end();
  
    })
  
  
  
  })

const port = process.env.PORT || 8080;

app.listen(8080, () => {
 console.log('Running on port ' + port);
});