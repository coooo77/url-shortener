const express = require('express')
const router = express.Router()

const Url = require('../models/url')

router.get('/', (req, res) => {
  Url.find()
    .lean()
    .exec((err, urls) => {
      const mainUrl = 'http://localhost:3000/'
      for (let i = 0; i < urls.length; i++) {
        urls[i].paramsUrl = mainUrl + urls[i].paramsUrl
      }
      if (err) return console.error(err)
      res.render('index', { urls, mainUrl })
    })
})

module.exports = router