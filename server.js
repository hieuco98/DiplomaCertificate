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
const diplomaAddress = '0xee3c46c5b5025efafab9ec2f65a4825a01b25311';
const address = '0x6C2cA4BD44B0b5FA149Aaa122b35904bc97609B4';
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json())

var defaultGas = 4700000;
var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

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
        var nameStudent = fields.nameStudent;
        var nameSchool = fields.nameSchool;
        var nameDiploma = fields.nameDiploma;
        var yearStart = fields.yearStart;
        var diplomaCode = fields.diplomaCode;
        var oldScoreBoardPath = files.scoreBoardFile.path;
        var newScoreBoardPath = '/Users/macbook/Desktop/DemoSystem/certificatesystem/public/scoreboard/' + files.scoreBoardFile.name;
        var oldDiplomaPath = files.diplomaFile.path;
            var newDiplomaPath= '/Users/macbook/Desktop/DemoSystem/certificatesystem/public/certificate/' + files.diplomaFile.name;
            fs.rename(oldDiplomaPath,newDiplomaPath, function (err) {
                if (err) throw err;
                // res.send('File uploaded and moved!');
                // res.end(); 
        })
        fs.rename(oldScoreBoardPath,newScoreBoardPath, function (err) {
            if (err) throw err;
            // res.send('File uploaded and moved!');
            // res.end(); 
    })
        var urlDiploma = "certificate/" + files.diplomaFile.name;
        var urlScoreBoard ="scoreBoard/"+ files.scoreBoardFile.name;

        Diploma.at(diplomaAddress).then(function(instance)
        {
            DiplomaInstance = instance;
          return DiplomaInstance.diplomaRegister(nameStudent, nameSchool, nameDiploma ,yearStart,urlDiploma,hashDiploma,diplomaCode,urlScoreBoard,{
              from: address,
              gas: defaultGas
            });
        }).then(async function(txReceipt) {
          console.log(txReceipt);
          res.send("Tạo văn bằng thành công");
  });

        //console.log(fields);
    //res.send("Success");
    })
})
app.post('/getDiplomaInfo',function(req,res)
{
    var diplomaCode = req.body.diplomaCode;
    var DiplomaInstance;
    Diploma.at(diplomaAddress).then(function(instance)
  {
    DiplomaInstance = instance;
    return DiplomaInstance.getIdOfCode.call(diplomaCode)
  }).then(function(idd)
  {
    id = idd;
    return DiplomaInstance.getDiplomaOfId.call(id);
  }).then(function(result)
  {
      res.send(result);
      })
})
app.post('/certificateDiploma',function(req,res)
{ 
    var diplomaInstance;
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        var hashDiploma = sha256File(files.diplomaFile.path);
        console.log(hashDiploma);
        Diploma.at(diplomaAddress).then(function(instance)
  {
    diplomaInstance = instance;
    return diplomaInstance.getIdOfName.call(hashDiploma);
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

