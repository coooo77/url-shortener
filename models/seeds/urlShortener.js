const mongoose = require('mongoose')
const Url = require('../url')
const urlList = require('./url')
const shortenUrlCheckAndStorage = require('../../shortenUrlCheckAndStorage')

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/urlShortener', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})
const db = mongoose.connection

db.on('error', () => {
  console.log('db error')
})

db.once('open', () => {
  console.log('db connected!')

  const shortenUrlList = []
  for (let i = 0; i < urlList.urls.length; i++) {
    shortenUrlCheckAndStorage(shortenUrlList)
  }

  const ObjToSave = []
  for (let i = 0; i < urlList.urls.length; i++) {
    const newObj = {
      inputUrl: urlList.urls[i].inputUrl,
      paramsUrl: shortenUrlList[i]
    }
    ObjToSave.push(newObj)
  }

  // 因為非同步的緣故，不能用下列作法，有空研究一下怎麼處理
  // for (let i = 0; i < urlList.urls.length; i++) {
  //   Url.create({
  //     inputUrl: urlList.urls[i].inputUrl,
  //     paramsUrl: shortenUrlList[i]
  //   })
  // }

  Url.create(ObjToSave)

  console.log('done')
})

// node urlShortener.js