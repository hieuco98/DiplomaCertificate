var xhr = new XMLHttpRequest();
  var prcAddress = '0xd6D3f2AD6bbeEcD62E348e077C791eFB8A3b82B1';
  const form = document.querySelector('form');
 function diplomaRegister()
{
    // collect files
    const diplomaFile = document.querySelector('[name=diplomaFile]').files;
    const scoreBoard = document.querySelector('[name=scoreBoardFile]').files;
    var nameStudent = $("#nameStudent").val();
    var nameSchool = $("#nameSchool").val();
    var nameDiploma =$("#nameDiploma").val();
    var yearStart = $("#yearStart").val();
    var diplomaCode = $("#diplomaCode").val();
    const formData = new FormData();
    formData.append('diplomaFile', diplomaFile[0]);
    formData.append('scoreBoardFile', scoreBoard[0]);
    formData.append('nameStudent',nameStudent);
    formData.append('nameSchool',nameSchool);
    formData.append('nameDiploma',nameDiploma);
    formData.append('yearStart',yearStart);
    formData.append('diplomaCode',diplomaCode);
    // post form data
    // log response
    xhr.onload = function()
      {
        console.log(xhr.responseText);
        alert(xhr.responseText)
}
    // create and send the reqeust
    xhr.open('POST','/createDiploma',true);
    xhr.send(formData);
}
function diplomaGetInfo()
{
    var diplomaCode = $("#diplomaCodeB").val();
    var code = {
        diplomaCode:diplomaCode
    }
    xhr.open('POST','/getDiplomaInfo',true);
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function()
    {
      //console.log(xhr.responseText);
      var diplomaInfo = JSON.parse(xhr.responseText);
      console.log(diplomaInfo);
      if(diplomaInfo.nameStudent === '')
      {
          alert("Số  hiệu văn bằng không tồn tại")
      }
      $("#urlLinkB").html('http://localhost:4000/' + diplomaInfo.urlDiploma);
      $("#nameStudentB").html(diplomaInfo.nameStudent);
      $("#nameSchoolB").html(diplomaInfo.nameSchool);
      $("#yearsB").html(diplomaInfo.yearStart);
      $("#scoreBoard").html('http://localhost:4000/'+ diplomaInfo.urlScoreBoard);
      
    }
    xhr.send(JSON.stringify(code));
      $("#diplomaCodeB").val();

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
      $("#studentB").html(result[0]);
      $("#schoolB").html(result[1]);
      $("#diplomaNameB").html(result[2]);
      $("#yearStartB").html(result.yearStart);
      $("#diplomaB").html('http://localhost:4000/'+result[4]);


    }
    xhr.send(formData);
        console.log("Waiting ")
  }
window.onload = function() {
    $("#createDiplomaBtnA").click(function() {
        diplomaRegister();
        //getAllContract();
      });
      $("#checkDiplomaB").click(function(e) {
        e.preventDefault();
        diplomaGetInfo();
        //getAllContract();
      });
      $("#checkFileB").click(function(e) {
        e.preventDefault();
        diplomaCheck();
        //getAllContract();
      });
      }
