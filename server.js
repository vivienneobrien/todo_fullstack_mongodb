const express = require("express")
const app = express()

app.get('/', (req, res) => {
    res.send("hello node api- small test")
})

app.listen(3000, () => {
    console.log("node api app is running on port 3000")
})