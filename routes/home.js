const express = require('express')
const router = express.Router()
const shortenUrlCheckAndStorage = require('../shortenUrlCheckAndStorage')
const Url = require('../models/url')

// 顯示首頁跟縮網址資料
router.get('/', (req, res) => {
  Url.find()
    .lean()
    .exec((err, urls) => {
      const mainUrl = process.env.Heroku || 'http://localhost:3000/'
      for (let i = 0; i < urls.length; i++) {
        urls[i].paramsUrl = mainUrl + urls[i].paramsUrl
      }
      if (err) return console.error(err)
      res.render('index', { urls, mainUrl })
    })
})

// 輸入網址，判斷網址資料
router.post('/', (req, res) => {
  console.log('req.body', req.body)
  if (req.body.input === "") {
    // 助教的檢查項目 ----------------------------------------------
    // req.body.input === "" 代表使用者沒有輸入內容
    // 若使用者沒有輸入內容，就按下了送出鈕，需要防止表單送出並提示使用者
    // 助教的檢查項目 ----------------------------------------------
    req.flash('warning_msg', '請輸入網址！')
    res.redirect('/')
  } else {
    Url.find()
      .lean()
      .exec((err, urls) => {
        // 助教的檢查項目 ----------------------------------------------
        // 若需要防止有重覆的網址組合出現
        // 先列印出所有縮網址給shortenUrlCheckAndStorage檢查
        // shortenUrlCheckAndStorage會給予不重複的縮網址
        // 助教的檢查項目 ----------------------------------------------
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

// 執行縮網址
router.get('/:id', (req, res) => {
  // console.log('------------------------------------------------------')
  // console.log('req.params.id', req.params.id)
  // console.log('------------------------------------------------------')
  // const id = req.params.id
  Url.findOne({ paramsUrl: req.params.id })
    .lean()
    .exec((err, url) => {
      console.log('------------------------------------------------------')
      console.log('url', url)
      console.log('------------------------------------------------------')
      if (err) return console.error(err)
      const originUrl = url.inputUrl
      res.redirect(`${originUrl}`)
    })

  // 下面的寫法Heroku會找不到params，只有找到一個叫favicon.ico的params，WHY????
  // Url.findOne({ paramsUrl: req.params.id }, (err, url) => {
  //   const originUrl = url.inputUrl
  //   console.log(originUrl)
  //   res.redirect(`${originUrl}`)
  // })
})

module.exports = router