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

  document.querySelectorAll('.goal-innards').forEach((goalInnard, goalIndex) => {
    let goalData = goals[goalIndex]
    let maxWidth = goalInnard.parentElement.offsetWidth
    let newWidth = maxWidth * Math.min(1, totalBalance / goalData.amountCAD)
    goalInnard.style.width = `${newWidth}px`

    if (totalBalance >= goalData.amountCAD) {
      goalInnard.parentElement.appendChild(html`<div class="goal-checkmark">✓</div>`)
    }
  })

  let readableDate = new Intl.DateTimeFormat('en-US', { dateStyle: 'full' }).format(new Date(balances.timestamp))
  
  document.querySelector('[amount-raised]').appendChild(html`
    <span>Our magazine has <code>CAD ${readableBalance}</code> in our bank account as of ${readableDate}.</span>
  `)
}

render()