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

  let rawBalance = balances.balance
  let decimalIndex = rawBalance.length - balances.decimal
  let totalBalance = `${rawBalance.slice(0, decimalIndex)}.${rawBalance.slice(decimalIndex)}`
  let readableBalance = new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(totalBalance)

  document.querySelector('[amount-raised]').innerText = `CAD ${readableBalance}`

  let readableDate = new Date(balances.timestamp)
  document.querySelector('[todays-date]').innerText = `${readableDate.getMonth() + 1}/${readableDate.getDate()}`
}

render()