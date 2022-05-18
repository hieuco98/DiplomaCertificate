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
const diploma = require('./build/contracts/Certificate2.json');
const diplomaAddress = '0xd9b548cc693A26a605a0449e2490F058f8AE9C2b';
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
app.post('/login',function(req,res)
{
    console.log(req.body);
    if(req.body.username==="admin"&&req.body.password==="smartuniversity123456")
    {
    res.send({
        code:200
    })
}
else{
    res.send({
        code:201
    })
}
})
app.post('/createDiploma',function(req,res)
{try {
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
              code:200,
           status:"Tạo văn bằng thành công",
           transactionID : txReceipt.tx
          }
          );
})
      //console.log(fields);
  //res.send("Success");
  })
} catch (error) {
  res.send({
    code:400,
    error:error
  })
}
   
})
app.post('/createScoreBoard',function(req,res)
{
  try {
    var DiplomaInstance;
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
        var hashDiploma = sha256File(files.scoreboardFile.path);


        Diploma.at(diplomaAddress).then(function(instance)
        {
            DiplomaInstance = instance;
          return DiplomaInstance.scoreBoardRegister(hashDiploma,{
              from: address,
              gas: defaultGas
            });
        }).then(async function(txReceipt) {
          console.log(txReceipt.tx);
          res.send(
            { 
                code:200,
             status:"Lưu bảng điểm thành công",
             transactionID : txReceipt.tx
            }
            );
  })
        //console.log(fields);
    //res.send("Success");
    })
  } catch (error) {
    
    res.send({
      code:400,
      error:error
    })
  }
    
})
app.post('/certificateDiploma',function(req,res)
{ 
  try {
    var diplomaInstance;
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      //console.log(files.diplomaFile)
        var hashDiploma = sha256File(files.diplomaFile.path);
        console.log(hashDiploma);
        Diploma.at(diplomaAddress).then(function(instance)
  {
    diplomaInstance = instance;
     diplomaInstance.checkCount({
      from: address,
      gas: defaultGas
    });
    }).then(async function(txReceipt) {
      //console.log(txReceipt);
    return diplomaInstance.getIdOfCode.call(hashDiploma);
  }).then(function(idd)
  {
    id = idd;
    return diplomaInstance.getDiplomaOfId.call(id);
  }).then(function(result)
  {
      //console.log(result);
      if(result.hashDiploma === '')
      {
        res.send({
          code:201,
          status:"Văn bằng bị chỉnh sửa hoặc không tồn tại"
        });
      }
      else
      {
        res.send({
          code:200,
          result:result,
          status:"Văn bằng chính gốc"
        })
      }
      
      })
        })
  } catch (error) {
    
    res.send({
      code:400,
      error:error
    })
  }
   

})
app.post('/certificateBoardScore',function(req,res)
{ 
  try {
    var diplomaInstance;
    var form = new formidable.IncomingForm();
    form.parse(req, async (err, fields, files) => {
      //console.log(files.diplomaFile)
        var hashDiploma = sha256File(files.scoreboardFile.path);
        console.log(hashDiploma);
        Diploma.at(diplomaAddress).then(function(instance)
  {
    diplomaInstance = instance;
    diplomaInstance.checkCount({
      from: address,
      gas: defaultGas
    });
    }).then(async function(txReceipt) {
    return diplomaInstance.getIdOfBoardScore.call(hashDiploma);
    })
  .then(function(idd)
  {
    id = idd;
    return diplomaInstance.getScoreBoardOfId.call(id);
  }).then(function(result)
  {
      //console.log(result);
      if(result.hashScoreBoard === '')
      {
        res.send({
          code:201,
          status:"Hồ sơ học tập bị chỉnh sửa hoặc không tồn tại"
        });
      }
      else
      {
        res.send({
          code:200,
          result:result,
          status:"Văn bằng chính gốc"
        })
      }
      })
        })
  } catch (error) {
    
  }
   

})
function getTotalMaterial()
{
    var diplomaInstance;
    return  Diploma.at(diplomaAddress).then(function(instance) {
        diplomaInstance = instance;
        return diplomaInstance.getNumberOfProducts.call()
      }).then(function(total) {
        return total;
      });
}
function getRegisterMaterial(id)
{
    var diplomaInstance;
    return Diploma.at(diplomaAddress).then(function(instance) {
        diplomaInstance = instance;
        return diplomaInstance.getDiplomaOfId.call(id).then(function(product) {
          //console.log(product);
          var a = new Date(product[1] * 1000);
          var year = a.getFullYear();
          var month = a.getMonth()+1;
          var date = a.getDate();
          var time = date + '/' + month + '/' + year;
          return {
            id: id,
            hash: product[0],
            time: time,
            year:year
          }
        })
      });
}
app.get('/showDiploma',async function(req, res)
{
  try {
    let products = [];
    //console.log(req.body.farmName)
    let total = await getTotalMaterial();
    console.log(total)
    for (let i = 1; i <= total; i++) {
        let product = await getRegisterMaterial(i);
        products.push(product);
      }
      //console.log(products);
      // var datasend = JSON.stringify(products);
      res.send({
          code:200,
          diploma_list:products,
          total: products.length
      }
        );
  } catch (error) {
    
  }
   

})
app.post('/checkYearDiploma',async function(req, res)
{
    let products = [];
    console.log(req.body.year)
    let total = await getTotalMaterial();
    console.log(total)
    for (let i = 1; i <= total; i++) {
        let product = await getRegisterMaterial(i);
        if(req.body.year == product.year)
        {
        products.push(product);
        }
      }
      console.log(products);
      // var datasend = JSON.stringify(products);
      res.send({
        //   products:products,
        code:200,
          total: products.length
      }
        );

})




function getTotalScoreBoard()
{
    var diplomaInstance;
    return  Diploma.at(diplomaAddress).then(function(instance) {
        diplomaInstance = instance;
        return diplomaInstance.getNumberOfScoreBoard.call()
      }).then(function(total) {
        return total;
      });
}
function getScoreBoard(id)
{
    var diplomaInstance;
    return Diploma.at(diplomaAddress).then(function(instance) {
        diplomaInstance = instance;
        return diplomaInstance.getScoreBoardOfId.call(id).then(function(product) {
          //console.log(product);
          var a = new Date(product[1] * 1000);
          var year = a.getFullYear();
          var month = a.getMonth()+1;
          var date = a.getDate();
          var time = date + '/' + month + '/' + year;
          return {
            id: id,
            hash: product[0],
            time: time,
            year:year
          }
        })
      });
}
app.get('/showScoreBoard',async function(req, res)
{
    let products = [];
    //console.log(req.body.farmName)
    let total = await getTotalScoreBoard();
    console.log(total)
    for (let i = 1; i <= total; i++) {
        let product = await getScoreBoard(i);
        products.push(product);
      }
      //console.log(products);
      // var datasend = JSON.stringify(products);
      res.send({
        code:200,
          scoreBoard_list:products,
          total: products.length
      }
        );

})
app.post('/checkYearScoreBoard',async function(req, res)
{
    let products = [];
    console.log(req.body.year)
    let total = await getTotalScoreBoard();
    console.log(total)
    for (let i = 1; i <= total; i++) {
        let product = await getScoreBoard(i);
        if(req.body.year == product.year)
        {
        products.push(product);
        }
      }
      console.log(products);
      // var datasend = JSON.stringify(products);
      res.send({
        //   products:products,
          code:200,
          total: products.length
      }
        );

})
app.get('/countCheck',function(req,res)
{
  var diplomaInstance;
    return  Diploma.at(diplomaAddress).then(function(instance) {
        diplomaInstance = instance;
        return diplomaInstance.getNumberOfCountCheck.call()
      }).then(function(countCheck) {
        console.log(countCheck.words[0])
        res.send({
          total:countCheck.words[0]
        })
      });
})



