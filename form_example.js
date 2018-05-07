var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: true });

var fs = require('fs');

var flag = 0;


var Scraper = require ('images-scraper')
, google = new Scraper.Google();
const Jimp = require("jimp");
 
app.use('/images', express.static('images'))

// Running Server Details.
var server = app.listen(80, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at %s:%s Port", host, port)
});
 
 


app.get('/', function (req, res) {

  fs.readFile('test.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();

  });

   

});




app.get('/scraped', function (req, res) {

  fs.readFile('scraped.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();

  });

   

});
 
app.post('/getImages', urlencodedParser, function (req, res){
console.log(req.body);
  var reply='';
  reply += "Your name is" + req.body.name;
  //reply += "Your E-mail id is" + req.body.email; 
  //reply += "Your address is" + req.body.address;
  //reply += "Your mobile number is" + req.body.mobilno;
  var imageName = req.body.name;




  google.list({
    keyword: imageName,
    num: 10,
    detail: true
    // nightmare: {
    //     show: true
    // }
  })
  .then(function (res) {
    //console.log(res);
    for(let url in res){
	//console.log(let);

      Jimp.read(res[url].url).then(function (lenna) {
        lenna.resize(500, 500)            // resize
             .quality(90)                 // set JPEG quality
             .greyscale()                 // set greyscale
             .write("images/"+req.body.search+[url]+".jpg"); // save
			 //res.send("images scraped from Google and converted to greyscale");
			flag = 1;
    }).catch(function (err) {
        console.error(err);
    });

    }
    
  }).catch(function(err) {
    console.log('err', err);
  }).finally(function() { 
  /*
  fs.readFile('scraped.html', function(err, data) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(data);
    res.end();

  }); 
  */

   //res.redirect('http://scrapeimage.openode.io/scraped');
   res.redirect('http://localhost/scraped');
  }
  


  );
  

  /*function send_res(){
	res.send(imageName);
  
  }*/

  
 });