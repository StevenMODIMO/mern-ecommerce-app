require("dotenv").config()
const express = require("express")
const app = express()
const cors = require("cors")
const mongoose = require("mongoose")
const db = mongoose.connection;
const collection = db.collection('biko');

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI,  { useNewUrlParser: true }).then(() => {
    app.listen(process.env.PORT, () => console.log(`http://localhost:${process.env.PORT}`))
})

const MyCollectionSchema = new mongoose.Schema({author: String} );

const MyCollection = mongoose.model('biko', MyCollectionSchema);

app.get("/", (req, res) => {
    res.json({json:"Hello from ecomm server"})
    const name = "Steven Pierre"
    MyCollection.findOne({author: name}).then(data => console.log(data))
})



