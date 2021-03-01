let footnoteTags

// Set up some helper funs
let getFootnoteTag = (footnoteId) => footnoteTags.find(el => el.getAttribute('footnote-id') === footnoteId)
let getFootnoteIndex = (footnoteId) => 1 + footnoteTags.indexOf(getFootnoteTag(footnoteId))

// Code smell: this conversion algorithm needs to match the algorithm in shortcodes/footnote.html
let titleToId = (footnoteTitle) => footnoteTitle.toLowerCase().replaceAll(' ', '-')

let getFootnoteData = (footnoteId) => {
  for (let footnoteTitle in footnotes) {
    if (titleToId(footnoteTitle) === footnoteId) {
      return footnotes[footnoteTitle]
    }
  }
}

function renderFootnotes() {
  footnoteTags = Array.from(document.querySelectorAll('[footnote-id]'))
  
  if (footnoteTags.length <= 0) {
    return
  }

  let canFitFootnoteColumn = () => {
    let mainColumnWidth = 780
    let footnoteColumnWidth = 220
    let padding = 60
    return document.body.offsetWidth > (mainColumnWidth + 2 * (footnoteColumnWidth + padding))
  }

  // Reset everything
  let footnoteContainerEl = document.querySelector('.footnotes-container')
  footnoteContainerEl.innerHTML = ''
  footnoteTags.forEach((footnoteLink, index) => {
    let footnoteId = footnoteLink.getAttribute('footnote-id')
    footnoteLink.parentNode.replaceChild(
      html`
        <a href="#footnote-block-${footnoteId}"
           id="footnote-link-${footnoteId}"
           class="footnote-link"
           title="Footnote ${1 + index}"
           aria-label="Footnote ${1 + index}"
           footnote-id="${footnoteId}">[${1 + index}]</a>`,
      footnoteLink
    )
  })
  footnoteTags = Array.from(document.querySelectorAll('[footnote-id]'))

  if (canFitFootnoteColumn()) {
    // Render the footnotes in the sidebar
    let lastFootnoteEndPos = 0
    footnoteTags.forEach(footnoteLink => {
      let footnoteId = footnoteLink.getAttribute('footnote-id')
      let footnoteData = getFootnoteData(footnoteId)
      let minFootnoteSpacing = 20
      let footnotePos = Math.max(footnoteLink.offsetTop, lastFootnoteEndPos + minFootnoteSpacing)
      let footnoteEl = html`
        <div id="footnote-block-${footnoteId}" class="footnote" style="position: absolute; top: ${footnotePos}px">
          <span class="footnote-number">${getFootnoteIndex(footnoteId)}.</span>
          <span> ${footnoteData.text} </span>
          <a href="#footnote-link-${footnoteId}" title="Back to content" aria-label="Back to content">↵</a>
        </div>
      `
      footnoteContainerEl.appendChild(footnoteEl)
      lastFootnoteEndPos = footnotePos + footnoteEl.offsetHeight
    })

    document.querySelector('.piece-container').style.minHeight = `${lastFootnoteEndPos}px`
  } else {
    // Register click events on footnote links
    footnoteTags.forEach(footnoteLink => {
      // Style the footnote number like a link
      footnoteLink.classList.add('link-style')
      
      // On click, render the footnote at the bottom of the page
      footnoteLink.addEventListener('click', (event) => {
        event.stopPropagation()
        let footnoteId = footnoteLink.getAttribute('footnote-id')
        openMobileFootnote(footnoteId)
      })
    })

    document.addEventListener('click', (event) => {
      event.stopPropagation()
      closeMobileFootnote()
    })
  }
}

let currentFootnoteId
function renderMobileFootnote() {
  let mobileFootnotesContainer = document.querySelector('.mobile-footnotes-container')
  if (currentFootnoteId) {
    let footnoteData = getFootnoteData(currentFootnoteId)
    let footnoteEl = html`
      <div class="mobile-footnote">
        <span style="font-weight: bold;">[${getFootnoteIndex(currentFootnoteId)}]</span> ${footnoteData.text}
      </div>
    `
    mobileFootnotesContainer.innerHTML = ''
    mobileFootnotesContainer.appendChild(footnoteEl)
    mobileFootnotesContainer.style['max-height'] = Math.min(400, footnoteEl.offsetHeight + 2) + 'px'
  } else {
    mobileFootnotesContainer.style['max-height'] = '0px'
  }
}

function openMobileFootnote(footnoteId) {
  currentFootnoteId = footnoteId
  renderMobileFootnote()
}

function closeMobileFootnote() {
  currentFootnoteId = null
  renderMobileFootnote()
}

document.fonts.ready.then(() => renderFootnotes())
window.addEventListener('resize', () => renderFootnotes())