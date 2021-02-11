let footnoteTags = Array.from(document.querySelectorAll('[footnote-id]'))

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

// Code smell. This needs to match $desktop-column-width in main.scss
let isDesktop = () => document.body.offsetWidth > 1090

function renderFootnotes() {
  // Render the footnote link numbers in the piece body
  footnoteTags.forEach((tag, index) => {
    tag.innerText = `[${1 + index}]`
  })

  if (footnoteTags.length <= 0) {
    return
  }

  if (isDesktop()) {
    // Move the page body a little bit to the left to center the footnotes sidebar
    document.querySelector('.piece-container').classList.add('has-footnotes')
    
    // Render the footnotes in the sidebar
    let footnoteContainerEl = document.querySelector('.footnotes-container')
    let lastFootnoteEndPos = 0
    footnoteTags.forEach(footnoteLink => {
      let footnoteId = footnoteLink.getAttribute('footnote-id')
      let footnoteData = getFootnoteData(footnoteId)
      let minFootnoteSpacing = 20
      let footnotePos = Math.max(footnoteLink.offsetTop, lastFootnoteEndPos + minFootnoteSpacing)
      let footnoteEl = html`
        <div class="footnote" style="position: absolute; top: ${footnotePos}px">
          <span style="font-weight: bold">[${getFootnoteIndex(footnoteId)}]</span> ${footnoteData.text}
        </div>
      `
      footnoteContainerEl.appendChild(footnoteEl)
      lastFootnoteEndPos = footnotePos + footnoteEl.offsetHeight
    })


    document.querySelector('.piece-container').style.minHeight = `${lastFootnoteEndPos}px`
  } else {
    // Register click events on footnote links
    footnoteTags.forEach(footnoteLink => {
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
        <span style="font-weight: bold">[${getFootnoteIndex(currentFootnoteId)}]</span> ${footnoteData.text}
      </div>
    `
    mobileFootnotesContainer.innerHTML = ''
    mobileFootnotesContainer.appendChild(footnoteEl)
    mobileFootnotesContainer.style['max-height'] = footnoteEl.offsetHeight + 'px'
    // mobileFootnotesContainer.classList.add('open')
  } else {
    mobileFootnotesContainer.style['max-height'] = '0px'
    // mobileFootnotesContainer.classList.remove('open') 
  }
}

function openMobileFootnote(footnoteId) {
  console.log('OPENING')
  currentFootnoteId = footnoteId
  renderMobileFootnote()
}

function closeMobileFootnote() {
  console.log('CLOSING')
  currentFootnoteId = null
  renderMobileFootnote()
}

document.fonts.ready.then(() => renderFootnotes())