function renderFootnotes() {
  // Render the footnote link numbers in the piece body
  let footnoteTags = Array.from(document.querySelectorAll('[footnote-id]'))
  footnoteTags.forEach((tag, index) => {
    tag.innerText = `[${1 + index}]`
  })

  if (footnoteTags.length > 0) {
    document.querySelector('.piece-container').classList.add('has-footnotes')
  }

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
}

document.fonts.ready.then(() => renderFootnotes())