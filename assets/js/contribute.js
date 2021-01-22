let protocol = 'https:'
if (window.location.protocol === 'ipfs:' || window.location.protocol === 'ipns:') {
  protocol = 'ipns:'
} else if (window.location.protocol === 'hyper:') {
  protocol = 'hyper:'
}
let monetizationUrl = `${protocol}//api.compost.digital/v0/monetization/balances.json`

async function render() {
  console.log('Fetching balances...')
  let balances
  try {
    balances = await fetch(monetizationUrl).then(res => res.json())
  } catch (e) {
    console.error(e)
  }
  console.log(balances)
  document.querySelector('[amount-raised]').innerText = JSON.stringify(balances, null, 2)
}

render()