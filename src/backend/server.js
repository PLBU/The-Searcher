//Modules
const express = require('express')
const fs = require('fs')
const cors = require('cors')

//Constants
const server = express()
const port = 5000

//Enabling all CORS Requests
server.use(cors() )

//Starting the server
server.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`)
})

//Endpoints Example
server.get('/txt', (req, res) => {
    fs.readFile('../../doc/contoh.txt', (err, data) => {
        if (err) throw err
        else {
            console.log(data.toString() )
            res.send(data)
        }
    })
})