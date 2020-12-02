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
let euroCities = ['London','Berlin','Manchester','Paris','Baku','Minsk','Prague','Riga','Monaco','Copenhagen','Lisbon','Moscow','Bucharest','Helsinki','Tbilisi','Belgrade','Madrid','Athens','Budapest','Bern','Ankara','Kiev','Rome'];
let euroCitiesText = document.getElementById('eurocities');

const upperCaseFirst = (string) => {
    let preserve = string[0];
    string = string.slice(1,string.length);
    preserve = preserve.toUpperCase();
    preserve += string;
    return preserve;
}

const upperCaseFirstAll = (string) => {
    let strArray = string.split(' ');
    for(let i = 0; i < strArray.length; i++){
        strArray[i] = upperCaseFirst(strArray[i])
    }
    return strArray.join(' ');
}

const activateModal = () => {
    modal.style.display = 'flex';
    modal.style.backgroundColor = 'rgba(0,0,0,0.4)';
    modalAlert.style.animationName = 'appear';
    modalAlert.style.animationDuration = '1s';
    modalAlert.style.backgroundRepeat = 'no-repeat';
    modalAlert.style.backgroundSize = 'cover';
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
    modalAlert.style.backgroundImage = 'url'+'('+`media/default.png`+')';
    let lowerCity = input.toLowerCase();
    switch(lowerCity) {
        case 'tbilisi':
            modalAlert.style.backgroundImage = 'url'+'('+`media/${0}.png`+')'
            break;
        case 'batumi':
            modalAlert.style.backgroundImage = 'url'+'('+`media/${1}.png`+')'
            break;
        case 'kutaisi':
            modalAlert.style.backgroundImage = 'url'+'('+`media/${2}.png`+')'
            break;
        case 'telavi':
            modalAlert.style.backgroundImage = 'url'+'('+`media/${3}.png`+')'
            break;
        case 'mestia':
            modalAlert.style.backgroundImage = 'url'+'('+`media/${4}.png`+')'
            break;
        case 'bakuriani':
            modalAlert.style.backgroundImage = 'url'+'('+`media/${5}.png`+')'
            break;
    }
    fetch(`https://api.teleport.org/api/urban_areas/slug:${lowerCity}/images/`)
    .then(responsee => responsee.json())
    .then(data => {
        photo = data.photos[0].image.web
        modalAlert.style.backgroundImage = 'url'+'('+`${photo}`+')';
    })
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${input}&units=metric&cnt=7&appid=${API}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        modalCityName.innerHTML = input;
        for(let i = 6; i<13; i++){
            let realDate = new Date();
            let day = new Date(realDate.getFullYear(),realDate.getMonth(),realDate.getDate()+(i-6));
            let displayDate = day.getFullYear() + " " + getMonthName(day.getMonth()) + " " + day.getDate();
            date[i-6].innerHTML = displayDate;
            weather[i].innerHTML = upperCaseFirstAll(data.list[i-6].weather[0].description);
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
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityNamesArray[i]}&units=metric&cnt=7&appid=${API}`)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        weather[i].innerHTML = upperCaseFirstAll(data.list[0].weather[0].description);
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
        cityCards[i].style.backgroundImage = 'url'+'('+`media/${i}.png`+')';
    })
}

closeBtn.addEventListener('click', closeModal)

for(let i = 0; i < cityCards.length; i++) {
    cityCards[i].addEventListener('click',() => {
        getCityWeather(cityNamesArray[i]);
        modalAlert.style.backgroundImage = 'url'+'('+`media/${i}.png`+')';
    } )
}


let euroCitiesTextArray = []

for(let i = 0; i < euroCities.length; i++) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${euroCities[i]}&units=metric&cnt=7&appid=${API}`)
    .then(response => response.json())
    .then(data =>{
        let temp = Math.floor(data.list[0].temp.day);
        euroCitiesText.innerHTML += `| ${euroCities[i]}: ${temp}° |`;
    })
}