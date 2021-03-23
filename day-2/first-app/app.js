const express = require('express')  // load libraries in java scripts, import the libs
const app = express()  // instant of the above library:express which is the main application called app
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/students', (req, res) => {
    const students = [{
        name: "superwoman",
        marks: 90
    },{
        name: "flash",
        marks: 70
    },{
        name: "batman",
        marks: 77
    },{
        name: "superman",
        marks: 60
    },{
        name: "arrow",
        marks: 94
    }]
    res.send(students)
  })

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})