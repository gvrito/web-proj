const modal = document.getElementById('modaljs')
const activatorBtn = document.getElementById('activator');
const closeBtn = document.getElementById('closeBtn')
const modalAlert = document.getElementById('modalAlertJs');
const API = '9de243494c0b295cca9337e1e96b00e2';
const searchBar = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const header = document.getElementById('headerJs');
const container = document.getElementById('containerjs');
let input = searchBar.value;
let cityCards = container.getElementsByClassName('city');
let blur = container.getElementsByClassName('blur');
let citynames = container.getElementsByClassName('cityname');
let weather = container.getElementsByClassName('weather');
let temperatures = container.getElementsByClassName('temperature');
let max = container.getElementsByClassName('max');
let min = container.getElementsByClassName('min');
let weatherIcon = container.getElementsByClassName('weatherimg');
let modalCityName = document.getElementsByClassName('cityname')[6];
let date = container.getElementsByClassName('date');
let cityNamesArray = ['Tbilisi','Batumi','Kutaisi','Telavi','Mestia','Bakuriani'];

const activateModal = () => {
    modal.style.display = 'flex';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
    modalAlert.style.animationName = 'appear';
    modalAlert.style.animationDuration = '1s';
}
const closeModal = () => {
    modalAlert.style.animationName = 'disappear';
    modalAlert.style.animationDuration = '1s';
    setTimeout(function(){
        modal.style.display = 'none';
    },1000);
}
const getMonthName = (number) => {
    const arr = ['January','February','March','April','May','June','July','August','September','October','November','December']
    return arr[number];
}
searchBar.addEventListener('click',function() {
    header.style.backgroundColor = 'rgb(220,220,220)'
})

container.addEventListener('click', function() {
    header.style.backgroundColor = 'rgb(250,250,250)'
})

const getCityWeather = function(input) {
    activateModal();
    fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${input}&units=metric&cnt=7&appid=${API}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        modalCityName.innerHTML = input;
        for(let i = 6; i<13; i++){
            let realDate = new Date();
            let day = new Date(realDate.getFullYear(),realDate.getMonth(),realDate.getDate()+(i-6));
            let displayDate = day.getFullYear() + " " + getMonthName(day.getMonth()) + " " + day.getDate();
            date[i-6].innerHTML = displayDate;
            weather[i].innerHTML = data.list[i-6].weather[0].description;
            temperatures[i].innerHTML = Math.floor(data.list[i-6].temp.day) + "°";
            max[i].innerHTML = "Max Temperature: " + Math.floor(data.list[i-6].temp.max) + "°";
            min[i].innerHTML = "Min Temperature: " + Math.floor(data.list[i-6].temp.min) + "°";
            switch(data.list[i-6].weather[0].icon) {
                case '01d': 
                    weatherIcon[i].src = 'media/01d.png'; 
                    break;
                case '02d':
                    weatherIcon[i].src = 'media/02d.png'
                    break;
                case '03d':
                    weatherIcon[i].src = 'media/03d.png'
                    break;
                case '04d':
                    weatherIcon[i].src = 'media/04d.png'
                    break;
                case '09d':
                    weatherIcon[i].src = 'media/09d.png'
                    break;
                case '10d':
                    weatherIcon[i].src = 'media/10d.png'
                    break;
                case '11d':
                    weatherIcon[i].src = 'media/11d.png'
                    break;
                case '13d':
                    weatherIcon[i].src = 'media/13d.png'
                    break;
                case '50':
                    weatherIcon[i].src = 'media/50d.png'
                    break;
                default: weatherIcon[i].src = 'media/01d.png'
            }
        }
    })
}


for(let i = 0; i < 6; i++) {
    citynames[i].innerHTML = cityNamesArray[i];
    fetch(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${cityNamesArray[i]}&units=metric&cnt=7&appid=${API}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        weather[i].innerHTML = data.list[0].weather[0].description;
        temperatures[i].innerHTML = Math.floor(data.list[0].temp.day) + "°";
        max[i].innerHTML = "Max Temperature: " + Math.floor(data.list[0].temp.max) + "°";
        min[i].innerHTML = "Min Temperature: " + Math.floor(data.list[0].temp.min) + "°";
        switch(data.list[0].weather[0].icon) {
            case '01d': 
                weatherIcon[i].src = 'media/01d.png'; 
                break;
            case '02d':
                weatherIcon[i].src = 'media/02d.png'
                break;
            case '03d':
                weatherIcon[i].src = 'media/03d.png'
                break;
            case '04d':
                weatherIcon[i].src = 'media/04d.png'
                break;
            case '09d':
                weatherIcon[i].src = 'media/09d.png'
                break;
            case '10d':
                weatherIcon[i].src = 'media/10d.png'
                break;
            case '11d':
                weatherIcon[i].src = 'media/11d.png'
                break;
            case '13d':
                weatherIcon[i].src = 'media/13d.png'
                break;
            case '50':
                weatherIcon[i].src = 'media/50d.png'
                break;
            default: weatherIcon[i].src = 'media/01d.png'
        }
        blur[i].style.backgroundImage = 'url'+'('+`media/${i}.png`+')';
    })
}

closeBtn.addEventListener('click', closeModal)

for(let i = 0; i < cityCards.length; i++) {
    cityCards[i].addEventListener('click',() => {
        getCityWeather(cityNamesArray[i]);
        modalAlert.style.backgroundImage = 'url'+'('+`media/${i}.png`+')';
        modalAlert.style.backgroundRepeat = 'no-repeat';
        modalAlert.style.backgroundSize = 'cover';

    } )
}




