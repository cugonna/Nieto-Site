//function for page 2

//todo: add file upload plugin and dummy username password entry at beginning
//if andrew logged in, show file upload div. If not, hide the div so it can't be
//accessed
$(document).ready(function(){
  var subj = localStorage.getItem("subject");
  var perd = localStorage.getItem("period");
  var user = localStorage.getItem("username");
  var pass = localStorage.getItem("password");
  var currSec = subj + ": " + perd;
  $("#section").html(currSec);
  $("#subper").val(currSec);
  $(function(){
    $("#date").datepicker();
  });
  $(".uploader").hide();
  $("#classinfo").hide();
  var count=0;
  $("#subject").val(subj);
  $("#period").val(perd);

  $("#date").change(function(){
    var ddata = $("#date").val();
    var subp = subj.replace(" ", "-");
    var perp = perd.replace(" ", "-");
    var datep = ddata.replace(/\//g, "-");
    //var path = 'http://10.0.0.24:8080/'+subp+"/"+perp+"/"+datep;

    if(user == "anieto" && pass == "3wholepotato"){
      $("#dataForm").attr('action', 'http://10.0.0.24:8080/anieto/files');
    }else{
      $("#dataForm").attr('action', 'http://10.0.0.24:8080/files');
    }
    //$("#dataForm").attr('action', 'http://10.0.0.24:8080/files');
    if(ddata.length == 10){
      //$(".dateselect").after("<h2>Files for " + ddata + "</h2>");
      //$("#fHeader").html("Files for " + ddata);

      /*list directory content
      var subp = subj.replace(" ", "-");
      var perp = perd.replace(" ", "-");
      var datep = ddata.replace(/\//g, "-");
      var path = "./uploads/"+subp+"/"+perp+"/"+datep;
      fs.readdir(path, function(err, items){
        console.log(items);
        for(var i=0; i<items.length; i++){
          console.log(items[i]);
        }
      });

      show only if logged in as anieto
      if(user == "anieto" && pass == "3wholepotato"){
        $(".uploader").show();
      }*/
    }

  });

  $("input#addf").on("click", function(){
    alert("Add new file!");
    count++;
    $("#fup").after('<input type="file" id="fup'+count+'" name="filetoupload'+count+'"><br>');
  });

  $("#fileupload").on("submit", function(){
    var fname = $("#fup").val();
    alert(fname);
  });

  function empty(){
    var dval = $("#date").val();
    if(dval == ""){
      alert("Please enter a date.");
      return false;
    }
  }
  
  function removeDoc(arr, index){
    alert("Removing this file...");
    arr.splice(index, 1);
    return arr;
  }
});

document.getElementById("dateButton").addEventListener("click", function(event){
    var dval = document.getElementById("date").value;
    if(dval == "" || dval.length <10){
      event.preventDefault();
    }
});
