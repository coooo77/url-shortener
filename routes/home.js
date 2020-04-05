const express = require('express')
const router = express.Router()
const shortenUrlCheckAndStorage = require('../shortenUrlCheckAndStorage')

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

router.post('/', (req, res) => {
  console.log('req.body', req.body)
  if (req.body.input === "") {
    // req.body.input === "" 代表使用者沒有輸入內容
    // 若使用者沒有輸入內容，就按下了送出鈕，需要防止表單送出並提示使用者
    req.flash('warning_msg', '請輸入網址！')
    res.redirect('/')
  } else {
    Url.find()
      .lean()
      .exec((err, urls) => {
        // 若需要防止有重覆的網址組合出現
        // 先列印出所有縮網址給shortenUrlCheckAndStorage檢查
        // shortenUrlCheckAndStorage會給予不重複的縮網址
        const paramsList = []
        for (let i = 0; i < urls.length; i++) {
          paramsList.push(urls[i].paramsUrl)
        }
        shortenUrlCheckAndStorage(paramsList)
        const newParams = paramsList.pop()
        const newUrl = new Url({
          inputUrl: req.body.input,
          paramsUrl: newParams
        })
        newUrl.save(err => {
          if (err) return console.error(err)
          req.flash('success_msg', '成功產生縮網址！')
          res.redirect('/')
        })
      })
  }
})

module.exports = router