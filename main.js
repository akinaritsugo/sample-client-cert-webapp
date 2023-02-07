const path = require("path");
const fs = require("fs");
const https = require("https");
const express = require("express");
const app = express();

const options = {
  cert: fs.readFileSync(path.join(__dirname, "./cert/server/server_cert.pem")),
  key: fs.readFileSync(path.join(__dirname, "./cert/server/server_key.pem")),
  requestCert: true,
  rejectUnauthorized: false,
  ca: [
    fs.readFileSync(path.join(__dirname, "./cert/server/server_cert.pem"))
  ]
};

app.get("/", (req, res, next) => {
  if (!req.client.authorized) {
    res.status(401).send('Invalid client certificate authentication.');
    return;
  }

  res.send('Hello, world!');
});

// app.listen(process.env.PORT || 3000);

https.createServer(options, app).listen(443);
