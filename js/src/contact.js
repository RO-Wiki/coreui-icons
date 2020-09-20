const form = document.getElementById('form')
  
form.onsubmit = event => {
  event.preventDefault()
  event.stopPropagation()

  const target = event.currentTarget
  const inputs = target.elements
  
  if (target[0].checkValidity() === false) {
    target.classList.add('was-validated')
  } else {
    const type = inputs['type'].value
    const name = inputs['name'].value
    const email = inputs['email'].value
    const message = inputs['message'].value

    let data

    if (type === 'hire-us') {
      const timeline = inputs['timeline'].value
      const budget = inputs['budget'].value

      data = {
        type,
        name,
        email,
        timeline,
        budget,
        message
      }
    } else {
      const product = inputs['product'].value
      const version = inputs['version'].value
  
      data = {
        type,
        name,
        email,
        product,
        version,
        message
      }
    }
  
    fetch('https://mail.coreui.io/contact_form.php', {
      method: 'POST',
      body: JSON.stringify(data)
    })
    .then(response => {
      const message = document.createElement('div')
      if (response.status === 200 && response.ok === true) {
        message.classList.add('alert', 'alert-success', 'mb-4')
        message.innerHTML = 'Your message has been sent.'
        // target.parentNode.insertBefore(message, target)
        target.prepend(message)
        target.reset()
      } else {
        message.classList.add('alert', 'alert-danger', 'mb-4')
        message.innerHTML = 'Sorry, it seems that our mail server is not responding. Please try again later!'
        // target.parentNode.insertBefore(message, target)
        target.prepend(message)
        target.reset()
      }
    })
  }
}