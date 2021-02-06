function showTableOfContents() {
  document.querySelector('[table-of-contents-container]').style.display = 'block'
  document.body.classList.add('no-scroll')
}

function hideTableOfContents() {
 document.querySelector('[table-of-contents-container]').style.display = 'none'
 document.body.classList.remove('no-scroll')
}