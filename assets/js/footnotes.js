console.log(footnotes)

let footnotesEl = document.querySelector('.footnotes-container')

Object.values(footnotes).forEach(footnote => {
  footnotesEl.appendChild(html`
    <div>${footnote.text}</div>
  `)
})