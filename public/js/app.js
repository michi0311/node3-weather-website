//test
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-one')
const messageTwo = document.querySelector('#message-two')
const locationButton = document.querySelector("#locationButton")

//fetches weather for current location
function getWeather() {
    if (!navigator.geolocation) {
        messageOne.textContent = "Please turn on your loaction services!"
    } else {
        //TODO fetch data from src/app.js
        navigator.geolocation.getCurrentPosition((pos) => {
            const latitude = pos.coords.latitude
            const longitude = pos.coords.longitude
            console.log(latitude, longitude)
            const query = pos.coords.longitude + ',' + pos.coords.latitude
            messageOne.textContent = 'Loading ...'
            messageTwo.textContent = ''
            fetch('/weather/?address=' + query).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        messageOne.textContent = data.error
                    } else {
                        messageOne.textContent = data.location
                        messageTwo.textContent = data.forecast
                    }
                })
            })
        })
    }
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    const location = search.value
    messageOne.textContent = 'Loading ...'
    messageTwo.textContent = ''
    fetch('/weather/?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})