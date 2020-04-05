function shortenUrlCheckAndStorage(targetArray) {
  // 產生 5個字串，0~9加上a~z
  const word = Math.random().toString(36).slice(-5)
  if (!targetArray.includes(word)) {
    targetArray.push(word)
    return
  } else {
    // 陣列中如果有重複的字串，就重新run一次function
    shortenUrlCheckAndStorage(targetArray)
  }
}

module.exports = shortenUrlCheckAndStorage