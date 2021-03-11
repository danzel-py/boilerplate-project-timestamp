// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({ greeting: 'hello API' });
});

app.get("/api/timestamp/:date?", (req, res) => {
  const entry = req.params.date
  let utc, unix
  if (entry) {
    const regex = /[^0-9]/
    if (regex.test(entry) === true) {
      if (new Date(entry) != 'Invalid Date') {
        utc = new Date(entry).toUTCString()
        unix = new Date(entry).getTime()
      }
      else {
        res.json({ error: "Invalid Date" })
      }

    }
    else {
      utc = new Date(parseInt(entry)).toUTCString()
      unix = new Date(parseInt(entry)).getTime()
    }
  }
  else {
    utc = new Date().toUTCString()
    unix = new Date().getTime()
  }
  res.json({ unix: unix, utc: utc })
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
