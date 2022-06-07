let body = document.querySelector('.body');
let icon = document.querySelector('.weatherIcon');
let temp = document.querySelector('.temp');
let tempM = document.querySelector('.tempM');
let description = document.querySelector('.description');
let locationW = document.querySelector('.location');
let deny = document.querySelector('.bodyI')
let info = document.querySelector('.info');
let another = document.querySelector('.another');
let test = document.querySelector('.test');
let input = document.querySelector('.input');
let ok = document.querySelector('.ok');
let cancel = document.querySelector('.cancel');
let inputV = document.querySelector('.countryI');
let form = document.querySelector('.form')
let infoH2 = document.querySelector('.info h2');

const APIKEY = "004bfa912252b9d9cadcf4c1c3e55c50"; 

form.addEventListener('submit', (e)=> {
    e.preventDefault();
    console.log(inputV.value)

    let api = `http://api.openweathermap.org/data/2.5/weather?q=${inputV.value}&appid=${APIKEY}`; 

    
    axios(api)
    .then((response) => {
        info.style.display = "none";
        locationW.textContent = `${response.data.name}, ${response.data.sys.country}`
        description.textContent = response.data.weather[0].description
        temp.innerHTML = `${Math.floor(response.data.main.temp - KELVIN)}<sup>O</sup>`;
        icon.src = `/icons/${response.data.weather[0].icon}.png`;
    })
    .catch((error) => {
        info.style.display = "block";
        infoH2.textContent = "Invalid search";
    })


})


ok.addEventListener('click', ()=> {
    test.style.display = "none";
    input.style.display= "block";
})

cancel.addEventListener('click', ()=> {
    another.style.display = "none";
})




const KELVIN = 273;

const weather = {};

weather.temperature = {
    unit: 'celsius'
}

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else {
    info.style.display = "block";
    another.style.display = 'block';
}

function setPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;

    getWeather(latitude,longitude);
}

function showError(error) {
    info.style.display = "block";
    another.style.display = 'block';
}

function getWeather(latitude,longitude) {
    let api = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${APIKEY}`;

    axios(api)
    .then((response)=> {
        locationW.textContent = `${response.data.name}, ${response.data.sys.country}`
        description.textContent = response.data.weather[0].description
        temp.innerHTML = `${Math.floor(response.data.main.temp - KELVIN)}<sup>O</sup>`;
        icon.src = `/icons/${response.data.weather[0].icon}.png`;

    })
    .catch((error) => {
        info.style.display = "block";
    })
}
