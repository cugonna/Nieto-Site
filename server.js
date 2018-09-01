const fs = require('fs');
const http = require('http');
const url = require('url');
const path = require('path');
var express = require('express');
var app = express();
var mv = require('mv');
var bp = require('body-parser');
var xupload = require('express-fileupload');

var server = http.createServer(app);
var upath;

app.use(bp.urlencoded({extended: true}));
app.use(xupload());

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
  });

});

app.get('/anieto/files', function(req, res){
  //res.send('<h1>Teacher Files</h1>');
  var s = req.query.subject;
  var p = req.query.period;
  var d = req.query.date;
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
        res.write('<li>' + items[i] + '</li>');
        //console.log(items[i]);
      }
      res.write('</ul>', function(err){
        res.end();
      });
    }

  });
  res.write('<form ref="uploadForm" id="fileupload" action="http://localhost:8080/upload/'+subp+'/'+perp+'/'+datep+'" method="post" encType="multipart/form-data"><h2 id="fHeader"></h2> <div class="uploader">    <input type="hidden" name="section" id="subper"><br>    <input type="file" id="fup" name="filetoupload" multiple><br> <input type="submit" value="Upload">  </div></form> <script src="./js/function2.js"></script>');
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

server.listen(8080);
console.log("listening on port 8080");
