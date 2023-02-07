var express = require("express");
var app = express();

app.get("/", (req, res, next) => {
  res.end("OK");
});

app.listen(process.env.PORT || 3000);
