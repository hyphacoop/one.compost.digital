console.log('micah')

async function init() {
  let annotations = await fetch(micahAnnotationURL).then(res => res.json())

  console.log(annotations)
  
  var viewer = OpenSeadragon({
    id: "openseadragon1",
    prefixUrl: `/js/vendor/openseadragon-bin-2.4.2/images/`,
    tileSources: {
      type: "image",
      url: micahImageURL
    }
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

  markers.forEach(marker => {
    const onMarkerClick = (e) => {
      console.log(marker)
      e.preventDefault()
      e.stopPropagation()
    }
    
    let markerElement = html`<img
      class="mesh-marker"
      id="right-arrow-overlay"
      src="http://upload.wikimedia.org/wikipedia/commons/7/7a/Red_Arrow_Right.svg"
      alt="Right arrow"
      width="20">`

    // This is how you register click events in openSeaDragon
    new OpenSeadragon.MouseTracker({
      element: markerElement,
      clickHandler: function(event) {
        console.log(marker)
        event.preventDefaultAction = true
      }
    })

    marker.element = markerElement
    viewer.addOverlay(marker)
  })
}

init()