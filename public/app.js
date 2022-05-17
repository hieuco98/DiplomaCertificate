
var xhr = new XMLHttpRequest();
var prcAddress = '0xd6D3f2AD6bbeEcD62E348e077C791eFB8A3b82B1';
const form = document.querySelector('form');
function diplomaRegister()
{
  // collect files
  const diplomaFile = document.querySelector('[name=diplomaFile]').files;

  const formData = new FormData();
  formData.append('diplomaFile', diplomaFile[0]);
  // post form data
  // log response
  xhr.onload = function()
    {
      console.log(xhr.responseText);
      var response = JSON.parse(xhr.responseText)
      if(response.code===200)
      {
      $("#transactionIDA").html(response.transactionID);
      alert(response.status)
      getAllDiploma();
      }
}
  // create and send the reqeust
  xhr.open('POST','/createDiploma',true);
  xhr.send(formData);
}
function diplomaCheck()
{
  const files = document.querySelector('[name=checkFile]').files;
  const formData = new FormData();
  formData.append('diplomaFile', files[0]);

  xhr.open("POST","/certificateDiploma",true);
  
  xhr.onload = function()
  {
   
    let result = JSON.parse(xhr.responseText);
    console.log(result)
    if(result[0]==='')
    {
      alert("Văn bằng lỗi hoặc bị làm giả");
    }
    // var linkIPFS = `https://ipfs.infura.io/ipfs/${product[1]}`
    // console.log(linkIPFS);
  else{
    alert("Văn bằng tồn tại ");
  }

  }
  xhr.send(formData);
      console.log("Waiting ")
}
function boardscoreCheck()
{
  const files = document.querySelector('[name=checkBoardScore]').files;
  const formData = new FormData();
  formData.append('scoreboardFile', files[0]);

  xhr.open("POST","/certificateBoardScore",true);
  
  xhr.onload = function()
  {
   
    let result = JSON.parse(xhr.responseText);
    console.log(result)
    if(result[0]==='')
    {
      alert("Văn bằng lỗi hoặc bị làm giả");
    }
    // var linkIPFS = `https://ipfs.infura.io/ipfs/${product[1]}`
    // console.log(linkIPFS);
  else{
    alert("Văn bằng tồn tại ");
  }

  }
  xhr.send(formData);
      console.log("Waiting ")
}
function countCheck() {
  xhr.open('GET','/countCheck',true);
  //xhr.setRequestHeader('content-type','application/json');
  
 xhr.onload = function()
     {
         //console.log(xhr.responseText);
         result = JSON.parse(xhr.responseText);
         console.log(result)
         //console.log(products);
         //showAllScoreBoard(result.products);
          $("#countCheckA").html(result.total);
         //console.log(products)
     }
     xhr.send();
  //return products;
}
window.onload = function() {
  countCheck();
  $("#createDiplomaBtnA").click(function() {
      diplomaRegister();
      //getAllContract();
    });
    $("#checkDiplomaB").click(function(e) {
      e.preventDefault();
      diplomaGetInfo();
      //getAllContract();
    });
    // $("#checkFileB").click(function(e) {
    //   e.preventDefault();
    //   diplomaCheck();
    //   //getAllContract();
    // });
    $("#checkboardScore").click(function(e) {
      e.preventDefault();
      boardscoreCheck();
      //getAllContract();
    });
    $("#checkFileB").click(function(e) {
      e.preventDefault();
      diplomaCheck();
      //getAllContract();
    });
    }
