const express = require("express")
const app = express()
const cors = require("cors")

app.get("/", (req, res) => {
    res.send("Hello from ecomm server")
})

app.listen(3000, () => console.log("http://localhost:3000"))