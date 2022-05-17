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
if (user !== '') {
    window.location.href = './admin.html'
  }
console.log(user);
function login()
{
    var username = $("#username").val();
    var password = $("#password").val();
    var data = {
        username:username,
        password:password
    }
    xhr.open('POST','/login',true);
    xhr.setRequestHeader('content-type','application/json');
    xhr.onload = function()
    {
       var response = JSON.parse(xhr.responseText);
       if(response.code === 200)
       {
        location.href = "admin.html";
        document.cookie = "user=admin; max-age=600";
        }
        else{
            alert("Sai mật khẩu");
            location.href = "login.html";
        }
    }
    xhr.send(JSON.stringify(data));
}
window.onload = function() {
    $("#login").click(function() {
    
        login();
        //getAllContract();
      });
    };