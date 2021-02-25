const express = require('express')
const mysql = require('mysql')

const app = express()
const port = 3333

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'docker-challenge'
}
const connection = mysql.createConnection(config)

const insertQuery = `INSERT INTO people(name) values('Pedro')`
connection.query(insertQuery)

const selectQuery = `SELECT * FROM people` 
let list = ''
connection.query(selectQuery, (err, rows, fields) => {
    if(err) {
        console.log(err);
        return res.status(500).send(err);
    }
    rows.map(person => {
        list = list === '' ? list = `<li>${person.name}</li>` : list.concat(`<li>${person.name}</li>`)
    })
})
connection.end()

app.get('/', (req, res) => {
    res.send(`
    <h1>Full Cycle</h1>
    <ul class="list">
    ${list}
    </ul>
    `)
})

app.listen(port, () => {
    console.log(`App is running on port ${port}...`)
})

