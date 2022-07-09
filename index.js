const form = document.querySelector('.password-form')
const mainPage = document.querySelector('.password-protected')
const checkBox = document.querySelector('.form-check')
const passInput = document.querySelector('.form-pass')
const submitBtn = document.querySelector('.pass-btn')
const errorTxt = document.querySelector('.error-txt')

const attemptsKey = 'attemptsRemaining'
localStorage.setItem(attemptsKey, 8)

const getStorageItem = (item) => {
    return localStorage.getItem(item)
}

const togglePasswordVisibility = ()=> {
    if (passInput.type === "password") {
      passInput.type = "text";
    } else {
      passInput.type = "password";
    }
}


const handleShowPage = (e) => {
    e.preventDefault()
    e.stopPropagation()
    const attemptsRemaining = getStorageItem(attemptsKey)
    const pass = passInput.value
    if (pass === 'password123' && attemptsRemaining > 1) {
        form.classList.add('no-show')
        mainPage.classList.add('show')
    } else {
        if (attemptsRemaining > 1) {          
            localStorage.setItem(attemptsKey, attemptsRemaining - 1)
            errorTxt.textContent = `sorry, you have ${attemptsRemaining-1} attempts left`
        } else {
            errorTxt.textContent = `sorry, you have to wait 2 minuites to try again.`
            setTimeout(() => {
                localStorage.setItem(attemptsKey, 8)
                console.log('done')
            },12000)
        }
    }
}

checkBox.addEventListener('click', togglePasswordVisibility)

submitBtn.addEventListener('click', handleShowPage)
passInput.addEventListener('keydown', (e) => {
    if (e.code === 'Enter') {
        handleShowPage(e)
    }
})