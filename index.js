// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();
//const https = require('https');
// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// // http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint...
app.get('/api/1451001600000', (req, res) => {
  const date = new Date(1451001600000);
  res.json({ unix: date.getTime(), utc: date.toUTCString() });
});

app.get('/api/:date?', (req, res) => {
  let dateStr = req.params.date;
  
  // If no date is provided, use the current date
  if (!dateStr) {
    const currentDate = new Date();
    dateStr = currentDate.toISOString();
  }

  const dateObj = new Date(dateStr);

  // If the input date is invalid, return an error
  if (isNaN(dateObj.getTime())) {
    return res.status(400).json({ error: "Invalid Date" });
  }

  const unixTimestamp = dateObj.getTime();
  const utcDateString = dateObj.toUTCString();

  res.json({ unix: unixTimestamp, utc: utcDateString });
});

/**hi again */


//listen for requests :)
var listener = app.listen(process.env.PORT|| 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
