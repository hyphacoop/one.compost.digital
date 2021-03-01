function resizeIframe(iframe) {
  iframe.style.height = iframe.offsetWidth + 'px'
}

function resizeIframes() {
  document.querySelectorAll('iframe').forEach(el => resizeIframe(el))
}

resizeIframes()

window.addEventListener('resize', resizeIframes)

if (isDesktop()) {
  document.querySelector('#biasesF').src = "../shafali/biasesF_2021_01_19_17_20_19/"
  document.querySelector('#materialF').src = "../shafali/materialF_2021_01_19_17_20_25/"
  document.querySelector('#CreatorF').src = "../shafali/CreatorF_2021_01_19_17_20_32/"
  document.querySelector('#LiteracyF').src = "../shafali/LiteracyF_2021_01_19_17_20_37/"
  document.querySelector('#RespectF').src = "../shafali/RespectF_2021_01_19_17_20_12/"
  document.querySelector('#IGF').src = "../shafali/intergenerational_Final_2021_01_19_17_19_49/"
} else {
  document.querySelector('#biasesF').src = "../shafali/biasesF_2021_01_19_17_20_19_mobile/"
  document.querySelector('#materialF').src = "../shafali/materialF_2021_01_19_17_20_25_mobile/"
  document.querySelector('#CreatorF').src = "../shafali/CreatorF_2021_01_19_17_20_32_mobile/"
  document.querySelector('#LiteracyF').src = "../shafali/LiteracyF_2021_01_19_17_20_37_mobile/"
  document.querySelector('#RespectF').src = "../shafali/RespectF_2021_01_19_17_20_12/"
  document.querySelector('#IGF').src = "../shafali/intergenerational_Final_2021_01_19_17_19_49_mobile/"
}

// document.querySelectorAll('iframe').forEach(el => 
//   el.addEventListener('touchstart', (e) => e.preventDefault())
//   el.addEventListener('touchmove', (e) => e.preventDefault())
// )