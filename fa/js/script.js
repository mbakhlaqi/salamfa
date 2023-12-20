new WOW().init()

const contactForm = document.getElementById('contact-form')
const submitButton = document.getElementById('submit-button')

let nameField = document.getElementById('name')
let emailField = document.getElementById('email')
let subjectField = document.getElementById('subject')
let messageField = document.getElementById('message')

const ContactFormDialogSuccess = document.getElementById('cfd-success')
const ContactFormDialogFail = document.getElementById('cfd-fail')
const ContactFormDialogTimeout = document.getElementById('cfd-timeout')

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    let formData = {
        name: nameField.value,
        email: emailField.value,
        subject: subjectField.value,
        message: messageField.value,
    }

    const disableForm = () => {
        nameField.disabled = true
        emailField.disabled = true
        subjectField.disabled = true
        messageField.disabled = true
        submitButton.disabled = true
    }

    const enableForm = () => {
        nameField.disabled = false
        emailField.disabled = false
        subjectField.disabled = false
        messageField.disabled = false
        submitButton.disabled = false
    }

    submitButton.innerHTML = 'درحال ارسال...'
    disableForm()

    const timeoutMillis = 60000
    let Timer
    const startTimer = () => {
        Timer = setTimeout(() => {
            formTimeOut()
        }, timeoutMillis)
    }
    const resetTimer = () => {
        clearTimeout(Timer)
    }

    const formSucces = () => {
        nameField.value = ''
        emailField.value = ''
        subjectField.value = ''
        messageField.value = ''
        ContactFormDialogSuccess.showModal()
        submitButton.innerHTML = 'ارسال شد'
        disableForm()
    }
    const formFail = () => {
        ContactFormDialogFail.showModal()
        submitButton.innerHTML = 'ارسال'
        enableForm()
    }
    const formTimeOut = () => {
        ContactFormDialogTimeout.showModal()
        submitButton.innerHTML = 'ارسال'
        enableForm()
    } 

    try {
        startTimer()
        let response = await fetch('https://salamfa.com/cfs/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        resetTimer()
        if (response.ok) {
            formSucces()
        } else {
            formFail()
        }
    } catch (error) {
        resetTimer()
        formFail()
    }
})