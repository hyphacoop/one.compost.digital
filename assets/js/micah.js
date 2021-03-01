console.log('micah')

async function init() {
  var viewer = window.viewer = OpenSeadragon({
    id: "openseadragon1",
    prefixUrl: `../js/vendor/openseadragon-bin-2.4.2/images/`,
    tileSources: {
      type: "image",
      url: '../micah/nb v24.jpg'
    },
    useCanvas: false
  })

  let markers = [
    {
        id: 'overlay-1',
        className: 'mesh-marker',
        x: 0.2008,
        y: 0.4778,
        placement: 'RIGHT',
        checkResize: false
    },
    {
        id: 'overlay-2',
        className: 'mesh-marker',
        x: 0.4008,
        y: 0.4778,
        placement: 'RIGHT',
        checkResize: false
    }
  ]

  let annotations = await fetch('../micah/micahsMapAnnotations.json').then(res => res.json())
  console.log(annotations)
  
  let infoEl = html`<div id="mesh-map-info-container"></div>`
  document.querySelector('.openseadragon-container').appendChild(infoEl)

  const renderInfo = (annotation) => {
    const makeMediaElement = (item) => {
      if (item.type === 'image') {
        return html`<img src="../${item.url}">`
      } else if (item.type === 'audio') {
        return html`<audio controls src="../${item.url}">`
      }
    }
    
    infoEl.innerHTML = ''

    if (annotation) {
      let contentEl = html`
        <div class="mesh-map-info-content" onclick=${(e) => e.stopPropagation()}>
          ${annotation.media.map(item => makeMediaElement(item))}
          <div class="text">${annotation.text}</div>
        </div>
      `
      infoEl.appendChild(contentEl)
    }
  }

  // let width = 4960
  // let height = 3508
  let width = 1920
  let height = 1358

  annotations.forEach(annotation => {
    let marker = {
      id: annotation.id,
      x: annotation.x / width,
      y: 0.7 * annotation.y / height,
      placement: 'CENTER',
      checkResize: false
    }
    
    let markerElement = html`<img
      class="mesh-marker"
      id="right-arrow-overlay"
      src="../micah/info-icon.svg"
      alt="Right arrow"
      width="20">`

    // This is how you register click events in openSeaDragon
    new OpenSeadragon.MouseTracker({
      element: markerElement,
      clickHandler: function(event) {
        console.log(marker)
        renderInfo(annotation)
        event.preventDefaultAction = true
      }
    })

    marker.element = markerElement
    viewer.addOverlay(marker)
  })

  viewer.addHandler('canvas-click', (event) => {
    if (infoEl.children.length > 0) {
      renderInfo(null)
      event.preventDefaultAction = true  
    }
  })

  document.addEventListener('click', (event) => {
    console.log('document click', event.target)
    if (!event.target.classList.contains('mesh-marker')) {
      renderInfo(null)
    }
  })
}

init()