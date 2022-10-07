const express = require("express")
const bodyParser = require("body-parser")
const morgan = require("morgan")
var cors = require('cors')
const { urlencoded } = require('body-parser');

const rotaRFID = require("./routes/RFIDS");
const rotaMovimentacao = require("./routes/movimentacao");

const app = express();
app.use(cors())
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());

app.use((req,res,next) => {
  res.header('Access-Control-Alow-Origin', '*');
  res.header('Acess-Control-Alow-Header',
    'Content-Type',
    'X-Requested-With',
    'Accept',
    'Authorization');

  if (req.method === 'OPTIONS') {
      res.header('Acess-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
      return res.status(200).send({})
  }

  next();
})

app.use("/RFID",rotaRFID)
app.use("/movimentacao",rotaMovimentacao)

app.use("/teste",(req,res) => {
  res.send("teste")
})

module.exports = app;