function resizeIframe(iframe) {
  iframe.style.height = iframe.offsetWidth + 'px'
}

function resizeIframes() {
  document.querySelectorAll('iframe').forEach(el => resizeIframe(el))
}

resizeIframes()

window.addEventListener('resize', resizeIframes)

// document.querySelectorAll('iframe').forEach(el => 
//   el.addEventListener('touchstart', (e) => e.preventDefault())
//   el.addEventListener('touchmove', (e) => e.preventDefault())
// )