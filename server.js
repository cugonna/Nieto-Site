const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
var express = require('express');
var app = express();
var mv = require('mv');
var bp = require('body-parser');
var xupload = require('express-fileupload');
const PORT = process.env.PORT || 8080;

var server = http.createServer(app);
var upath;

app.use(bp.urlencoded({extended: true}));
app.use(xupload());

app.get('/', function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.send('<h1 style="text-align:center">Mr. Nieto Course Directory</h1> <div><img class="img-center" src="nieto1.png"></div><div class="auth"><form id="enter" method="post">Username: <input type="text" id="username" name="username">Password: <input type="password" id="pswd" name="password"><input type="submit" value="Login" id="login"></form></div>');
  res.end();
});

app.post('/index', function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  /*res.send('<h1 style="txt-align:center">Mr. Nieto Course Directory</h1><div><img class="img-center" src="nieto1.png"></div><div class="sublist"><h2 style="text-align:center">2018-2019</h2><form class="schedform" method="post" action="/schedule"><table class="subject1"><th class="sub">Adv Algebra with Trig</th><tr><td><a class="period">3rd,4th</a></td></tr></table><table class="subject2"><th class="sub">Adv Algebra with Trig-Ms. Nieto</th><tr><td><a class="period" >1st,5th</a></td></tr></table><table class="subject3"><th class="sub">Geometry</th><tr><td><a class="period">7th</a></td></tr></table></form></div>' +
'<script>var section = "";$(document).ready(function(){var user="";var pswd="";$(".period").click(function(){section = "";var sub = $(this).closest("table").find(".sub");var s = sub.html();var p = $(this).html();section = s + ": " + p;alert(section);localStorage.setItem("subject", s);localStorage.setItem("period", p);$("schedform").submit();});$("#login").click(function(){user = $("#username").val();pswd = $("#pswd").val();localStorage.setItem("username", user);localStorage.setItem("password", pswd);});});</script>');*/
res.send("Hello world");
  res.end();
});

app.post('/schedule', function(req, res){
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.send('This is the schedule page');
  res.end();
});

app.get('/files', function(req, res){
  var s = req.query.subject;
  var p = req.query.period;
  var d = req.query.date;
  res.write('<h1>Files for ' + d + '</h1>');
  //list directory content
  var subp = s.replace(" ", "-");
  var perp = p.replace(" ", "-");
  var datep = d.replace(/\//g, "-");
  var path = "./uploads/"+subp+"/"+perp+"/"+datep;
  usubject = subp;
  uperiod = perp;
  udate = datep;
  upath = "uploads\\"+subp+"\\"+perp+"\\"+datep;
  fs.readdir(path, function(err, items){
    console.log(items);
    if(items != undefined){
      res.write('<ul>');
      for(var i=0; i<items.length; i++){
        var file = items[i].replace(" ", "_");
        //res.write('<li>' + items[i] + ' <a href="'+upath+'/'+items[i]+'" target="_blank">'+items[i]+'</a></li>');
        res.write('<li>' + file + ' <form action="http://localhost:8080/download/'+file+'" method="get" target="_blank"><input type="submit" value="Open"></input></form></li>');
        //console.log(items[i]);
      }
      res.write('</ul>', function(err){
        res.end();
      });
    }

  });

});

app.get('/anieto/files', function(req, res){
  //res.send('<h1>Teacher Files</h1>');
  var s = req.query.subject;
  var p = req.query.period;
  var d = req.query.date;
  res.write('<script src="./js/function2.js"></script>');
  res.write('<h1>Files for ' + d + '</h1>');
  //list directory content
  var subp = s.replace(" ", "-");
  var perp = p.replace(" ", "-");
  var datep = d.replace(/\//g, "-");
  var path = "./uploads/"+subp+"/"+perp+"/"+datep;
  upath = "uploads\\"+subp+"\\"+perp+"\\"+datep;
  fs.readdir(path, function(err, items){
    console.log(items);
    if(items != undefined){
      res.write('<ul>');
      for(var i=0; i<items.length; i++){
        var file = items[i].replace(" ", "_");
        res.write('<li>' + items[i] + ' <form action="http://localhost:8080/remove/'+subp+'/'+perp+'/'+datep+'/'+file+'" method="get"><input type="submit" class="removeF" value="Remove"></input></form></li><script>var removeDoc = function(arr, index){alert("Removing this file...");arr.splice(index, 1);return arr;}</script>');
        //console.log(items[i]);
      }
      res.write('</ul>', function(err){
        res.end();
      });
    }

  });
  res.write('<form ref="uploadForm" id="fileupload" action="http://localhost:8080/upload/'+subp+'/'+perp+'/'+datep+'" method="post" encType="multipart/form-data"><h2 id="fHeader"></h2> <div class="uploader">    <input type="hidden" name="section" id="subper"><br>    <input type="file" id="fup" name="filetoupload" multiple><br> <input type="submit" value="Upload">  </div></form> <script src="./js/function2.js"></script>');
});

app.get('/remove/:sub/:per/:date/:file', function(req, res){
  var fname = req.params.file;
  var subp = req.params.sub;
  var perp = req.params.per;
  var datep = req.params.date;
  res.write('<h1>Files for ' + datep + '</h1>');
  var path = "./uploads/"+subp+"/"+perp+"/"+datep;
  fs.readdir(path, function(err, items){
    console.log(fname);
    var fspace = fname.replace('_', ' ');
    if(items != undefined){
      res.write('<ul>');
      for(var i=0; i<items.length; i++){
        if(items[i] == fspace){
          console.log("Removing file: " + fspace);
          fs.unlink(path+'/'+fspace);
        }else{
          var file = items[i].replace(" ", "_");
          res.write('<li>' + items[i] + ' <form action="" method="get"><input type="submit" class="removeF" value="Remove"></input></form></li><script>var removeDoc = function(arr, index){alert("Removing this file...");arr.splice(index, 1);return arr;}</script>');
          //console.log(items[i]);
        }
      }
      res.write('</ul>', function(err){
        res.end();
      });
    }
  });
  res.write('<form ref="uploadForm" id="fileupload" action="http://10.0.0.24:8080/upload/'+subp+'/'+perp+'/'+datep+'" method="post" encType="multipart/form-data"><h2 id="fHeader"></h2> <div class="uploader">    <input type="hidden" name="section" id="subper"><br>    <input type="file" id="fup" name="filetoupload" multiple><br> <input type="submit" value="Upload">  </div></form>');
});

app.get('/download/:file', function(req, res){
  //res.writeHead(200, {"Content-Type":"text/html"});
  var fname = req.params.file;
  //console.log("download path: "+__dirname+"\\"+upath+"\\"+fname);
  var fdir = __dirname+"\\"+upath+"\\"+fname;
  console.log(fdir);
  fs.readFile(fdir, function(err, data){
    res.contentType("application/pdf");
    res.send(data);
  });

  //res.download(fdir);

});

app.post('/upload/:subject/:period/:date', function(req, res){
  res.writeHead(200, {"Content-Type":"text/html"});
  var usubject = req.params.subject;
  var uperiod = req.params.period;
  var udate = req.params.date;
  let file = req.files.filetoupload;
  res.write("Subject is " + usubject + ", period is " + uperiod + ", date is " + udate);
  res.write("file " + file.name + " uploaded successfully</br>");
  var dir = './uploads/'+usubject;
  var dir2 = dir+'/'+uperiod;
  var dir3 = dir2+'/'+udate;
  if(!fs.existsSync(dir)){
    fs.mkdirSync(dir);
  }
  if(!fs.existsSync(dir2)){
    fs.mkdirSync(dir2);
  }
  if(!fs.existsSync(dir3)){
    fs.mkdirSync(dir3);
  }
  file.mv(dir3+'/'+file.name, function(err){
  });
  //console.log(__dirname);
  //res.sendFile(__dirname + "schedule.html");
  res.end();
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on ${PORT}/`);
});

