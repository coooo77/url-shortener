const express = require('express')
const app = express()
const port = 3000 // = process.env

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/', require('./routes/home'))

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})