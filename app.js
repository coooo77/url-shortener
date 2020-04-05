const express = require('express')
const app = express()
const port = 3000 // = process.env

// bodyParser要放在express-handlebars之前才會有作用
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const exphbs = require('express-handlebars')
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

const session = require('express-session')
app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
}))

// flash要有session才會啟動
const flash = require('connect-flash')
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

app.use('/', require('./routes/home'))

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}`)
})