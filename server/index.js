var path = require ('path');
var fs = require ('fs');
var express = require ("express");
var app =  express();
var dataPath = path.join(__dirname, 'data.json');
var clientPath  = path.join(__dirname,'../client');
var bodyParser = require('body-parser')


app.use(express.static(clientPath));  //step 1
app.use(bodyParser.json());




app.route('/api/chirps')    
.get(function(req, res) {
   res.sendFile(path.join(__dirname, 'data.json'));
  }).post(function(req, res) {

      var newChirp = req.body; //missed it 
      readFile(dataPath, 'utf8')
      .then(function(fileContents){
          console.log(fileContents);
          var chirps = JSON.parse(fileContents);
          chirps.push(newChirp);
          return writeFile(dataPath, JSON.stringify(chirps));
      }).then(function(){
          res.sendStatus(201);
      }).catch(function(err){
          console.log(err);
          res.sendStatus(500);
      });
      
//   fs.readFile(dataPath, 'utf8', function(err, fileContents) {
//       if (err){
//           console.log(err);
//           res.status(500).send("Internal Server Error");  

//       }else {
//           var chirps = JSON.parse(fileContents);
//           chirps.push(newChirp);
//           fs.writeFile(dataPath, JSON.stringify(chirps), function(err){
//               if (err) {
//                   console.log(err);
//                   res.sendStatus(500);
//               }else{
//                   //res.set('Content-Type', 'text/plain');
//                   //res.send('ACCEPTED');
//                   res.sendStatus(201);
//               }
//           });
//       }
//     });
  });
app.listen(3000);

function readFile(filePath, encoding){
    return new Promise(function(resolve, reject) {
        fs.readFile(filePath, encoding, function(err, data){
            if (err){
                reject(err);
            }else{
                resolve(data);
            }
        });
    });
}

function writeFile(filePath,data) {
    return new Promise(function(resolve, reject){
        fs.writeFile(filePath, data, function(err){
            if (err) {
                reject(err);
            }else{
                resolve();
            }
        });
    });
}
