require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
var fs = require('fs');
const Web3 = require('web3');
var bodyParser = require("body-parser");
var formidable = require("formidable");
const contract = require('truffle-contract');
var sha256File = require('sha256-file');
const diploma = require('./build/contracts/Certificate.json');
const diplomaAddress = '0xfE643E680ce7742C0Ea4c2063C010DeaA6CDE474';
const address = '0x1c0637576eced70548a8555196b2c78a6de4d369';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

var defaultGas =3466900;
var web3 = new Web3(new Web3.providers.HttpProvider('http://203.162.88.109:8082'))

app.use(express.json());
app.use(express.static(__dirname + '/public'));


const Diploma = contract(diploma);
Diploma.setProvider(web3.currentProvider); 



app.listen(4000,function()
{
    console.log("Server is running in port 4000");
});
app.post('/createDiploma',function(req,res)
{
    var DiplomaInstance;
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        var hashDiploma = sha256File(files.diplomaFile.path);


        Diploma.at(diplomaAddress).then(function(instance)
        {
            DiplomaInstance = instance;
          return DiplomaInstance.diplomaRegister(hashDiploma,{
              from: address,
              gas: defaultGas
            });
        }).then(async function(txReceipt) {
          console.log(txReceipt.tx);
          res.send(
            { 
             status:"Tạo văn bằng thành công",
             transactionID : txReceipt.tx
            }
            );
  });

        //console.log(fields);
    //res.send("Success");
    })
})
app.post('/certificateDiploma',function(req,res)
{ 
    var diplomaInstance;
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      //console.log(files.diplomaFile)
        var hashDiploma = sha256File(files.diplomaFile.path);
        console.log(hashDiploma);
        Diploma.at(diplomaAddress).then(function(instance)
  {
    diplomaInstance = instance;
    return diplomaInstance.getIdOfCode.call(hashDiploma);
  }).then(function(idd)
  {
    id = idd;
    return diplomaInstance.getDiplomaOfId.call(id);
  }).then(function(result)
  {
      console.log(result);
      res.send(result);
      })
        })

})

