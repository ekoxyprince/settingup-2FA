const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
const app = express()
const routes = require("./routes/route")

app.engine("ejs",ejs.renderFile)
app.set("view engine","ejs")
app.set("views","views")
app.use(express.static("public"))
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.use("/",routes)
module.exports = app