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

// https://developer.mozilla.org/zh-TW/docs/Web/API/Document/execCommand
// 已過時
// This feature is obsolete. Although it may still work in some browsers, its use is discouraged since it could be removed at any time. Try to avoid using it.

// 雖然可以使用，但是要找其他方法比較適合