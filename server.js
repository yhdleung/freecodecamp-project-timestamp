// server.js
// where your node app starts

require('dotenv').config();

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// API endpoints

// date string to unix time and UTC
app.get("/api/:date?", function (req, res) {
  let t = req.params.date;
  if(!t){
    date = new Date();
  }else if(Number(t)){
    date = new Date(parseInt(t));
  }else if(Date.parse(t)){
    date = new Date(t);
  }else{
    res.json({ error : "Invalid Date"});
  }
  res.json({
    unix: date.getTime(),  
    utc: date.toUTCString(),
  });
});



// listen for requests :)
const port = process.env.PORT || 3000;
var listener = app.listen(port, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
