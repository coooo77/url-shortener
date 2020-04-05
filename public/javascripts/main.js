const list = document.querySelector('#show')

list.addEventListener('click', event => {
  if (event.target.classList.contains('copyUrl')) {
    const textRange = document.createRange()
    textRange.selectNode(event.target.parentElement.previousElementSibling)
    sel = window.getSelection()
    sel.removeAllRanges()
    sel.addRange(textRange)
    document.execCommand('copy')
    sel.removeAllRanges()
    alert("縮網址已經複製！")
  }
})