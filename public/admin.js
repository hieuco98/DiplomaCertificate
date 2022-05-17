var xhr = new XMLHttpRequest();
function getCookie(cname) {
    var name = cname + '=';
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}
var user = getCookie('user');
// if (user === '') {
//     alert("Chưa đăng nhập")
//     window.location.href = './login.html'
//   }
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
function scoreboardRegister()
{
  // collect files
  const scoreboardFile = document.querySelector('[name=scoreboardFile]').files;

  const formData = new FormData();
  formData.append('scoreboardFile', scoreboardFile[0]);
  // post form data
  // log response
  xhr.onload = function()
    {
      console.log(xhr.responseText);
      var response = JSON.parse(xhr.responseText)
      if(response.code===200)
      {
      $("#transactionIDB").html(response.transactionID);
      alert(response.status)
      getAllDiploma();
      }
}
  // create and send the reqeust
  xhr.open('POST','/createScoreBoard',true);
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
function getAllDiploma() {
    let products = [];
      xhr.open('GET','/showDiploma',true);
      //xhr.setRequestHeader('content-type','application/json');
      
     xhr.onload = function()
         {
             //console.log(xhr.responseText);
             result = JSON.parse(xhr.responseText);
             //console.log(products);
             showAllRegister(result.products);
              $("#totalCertificate").html(result.total);
             //console.log(products)
         }
         xhr.send();
      //return products;
    }
    
    // Show all registered products on the page
    function showAllRegister(list) {
          console.log(list)
        $("#certificateListB").html('');
        list.forEach(function(item, index) {
          if(item !== null)
          {
          $("#certificateListB").append("<tr><td>" + item.id + "</td><td>" + item.hash + "</td><td>" + item.time + "</td></tr>");
          }
        });
      }
      function diplomaYearCheck()
      {
        {
            var year = $("#yearB").val();
            var  yearCheck ={
              year : year
            }
            xhr.open('POST','/checkYearDiploma',true);
            xhr.setRequestHeader('content-type','application/json');
            xhr.onload = function()
          {
            //console.log(xhr.responseText);
            var number = JSON.parse(xhr.responseText)
            console.log(number);
             $("#numberDiploma").html(number.total);
        
          }
          xhr.send(JSON.stringify(yearCheck));
          $("#yearB").val()
        }
      }
      function getAllScoreBoard() {
          xhr.open('GET','/showScoreBoard',true);
          //xhr.setRequestHeader('content-type','application/json');
          
         xhr.onload = function()
             {
                 //console.log(xhr.responseText);
                 result = JSON.parse(xhr.responseText);
                 //console.log(products);
                 showAllScoreBoard(result.products);
                  $("#totalScoreBoard").html(result.total);
                 //console.log(products)
             }
             xhr.send();
          //return products;
        }
        
        // Show all registered products on the page
        function showAllScoreBoard(list) {
              console.log(list)
            $("#certificateListC").html('');
            list.forEach(function(item, index) {
              if(item !== null)
              {
              $("#certificateListC").append("<tr><td>" + item.id + "</td><td>" + item.hash + "</td><td>" + item.time + "</td></tr>");
              }
            });
          }
          function scoreboardYearCheck()
          {
            {
                var year = $("#yearC").val();
                var  yearCheck ={
                  year : year
                }
                xhr.open('POST','/checkYearScoreBoard',true);
                xhr.setRequestHeader('content-type','application/json');
                xhr.onload = function()
              {
                //console.log(xhr.responseText);
                var number = JSON.parse(xhr.responseText)
                console.log(number);
                 $("#numberScoreBoardC").html(number.total);
            
              }
              xhr.send(JSON.stringify(yearCheck));
              $("#yearC").val()
            }
          }
      function logOut()
      {
        document.cookie = "user=; expires=Wed, 27 Feb 2019 07:41:28 GMT;";
        window.location.href = './login.html'
      }
window.onload = function() {
    getAllDiploma();
    //getAllScoreBoard();
  $("#createDiplomaBtnA").click(function() {
      diplomaRegister();
      //getAllContract();
    });
    $("#createScoreBoardBtnA").click(function() {
      scoreboardRegister();
      //getAllContract();
    });
    $("#logOut").click(function() {
        logOut();
        //getAllContract();
      });
    // $("#checkDiplomaB").click(function(e) {
    //   e.preventDefault();
    //   diplomaGetInfo();
    //   //getAllContract();
    // });
    $("#checkDiplomaB").click(function(e) {
      e.preventDefault();
      diplomaYearCheck();
      //getAllContract();
    });
    $("#checkListC").click(function(e) {
      e.preventDefault();
     getAllScoreBoard();
      //getAllContract();
    });
    $("#checkScoreBoardC").click(function(e) {
      e.preventDefault();
      scoreboardYearCheck()
      //getAllContract();
    });
    }