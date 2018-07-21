const bodyParser = require('body-parser');
const express = require('express'),
      app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"))

function send(p){
  let obj = p
  app.post('/',(req,res) => {
    res.send(obj);
  });
}
app.listen(3000,() => console.log("express server started at port 3000"));

module.exports.send = send;
