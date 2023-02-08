const express = require("express")
const router = express.Router()
const routeController = require("../controllers/routecontroller")

router
.route("/")
.get(routeController.getHome)
.post(routeController.postHome)

module.exports = router