const button = document.querySelector('button')
if (location.protocol === 'file:') {
  button.remove()
}

const blob = new Blob([document.body.outerHTML], {
  type: 'text/html'
})

const link = document.createElement('a')
Object.assign(link, {
  target: '_blank',
  href: URL.createObjectURL(blob),
  download: 'tryrating-__DATE__.html'
})

function savePage() {
  link.click()
}
