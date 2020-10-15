// server.js
// where your node app starts

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

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/", function (req, res) {
  res.json({unix: Date.now(),utc: new Date(Date.now()).toUTCString()});
});


app.get("/api/timestamp/:date_string", function (req, res) {
  let date = new Date(req.params.date_string)
  let unix;
  let utc;
  req.params.date_string.length == 13 ? unix = Number(req.params.date_string) : unix = Date.parse(req.params.date_string);
  req.params.date_string.length == 13 ? utc = new Date(Number(req.params.date_string)).toUTCString() : utc = new Date(date).toUTCString()
  utc === "Invalid Date" ? utc = new Date(Date.now()).toUTCString() : null
  isNaN(unix) ? unix = Date.now() : null
  res.json({unix: unix,utc: utc});
});


// listen for requests :)
var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
