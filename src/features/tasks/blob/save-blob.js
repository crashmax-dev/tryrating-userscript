function savePage() {
  const body = document.body.cloneNode(true)
  body.querySelector('button')?.remove()
  body.querySelector('script')?.remove()

  const blob = new Blob([body.outerHTML], {
    type: 'text/html'
  })

  const link = document.createElement('a')
  Object.assign(link, {
    target: '_blank',
    href: URL.createObjectURL(blob),
    download: 'tryrating-__DATE__.html'
  })

  link.click()
}
