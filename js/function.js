//functionality for Nieto Course Site

var section = "";


$(document).ready(function(){
  var user="";
  var pswd="";
  $(".period").click(function(){
    section = "";
    var sub = $(this).closest('table').find('.sub');
    var s = sub.html();
    var p = $(this).html();
    section = s + ": " + p;
    //alert(section);
    localStorage.setItem("subject", s);
    localStorage.setItem("period", p);
  });

  $("#login").click(function(){
    user = $("#username").val();
    pswd = $("#pswd").val();
    
    //alert(user + " " + pswd);
    localStorage.setItem("username", user);
    localStorage.setItem("password", pswd);
  });

});
