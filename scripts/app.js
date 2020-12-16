const cityForm = document.querySelector('form');
const cityName = document.querySelector('.card');
const weatherCond = document.querySelector('.details');
const imageSource = document.querySelector('img.time');
const iconSource = document.querySelector('.icon img');


const updateUI = (data) => {
    
    const {cityDet , weatDet} = data;
    
    weatherCond.innerHTML = ` 
    <h5 class="my-3">${cityDet.EnglishName}</h5>
    <div class="my-3">${weatDet.WeatherText}</div>
    <div class="my-4 display-4">
        <span>${weatDet.Temperature.Metric.Value}</span>
        <span>&deg;C</span>`;

    if(cityName.classList.contains('d-none')){
        cityName.classList.remove('d-none');
    }

    (weatDet.IsDayTime)?imageSource.setAttribute('src', '/Img/day.svg') : imageSource.setAttribute('src', '/Img/night.svg');
    
};


const getCityData = async(cityValue) => {
    const cityDet = await getCity(cityValue);
    const weatDet = await getWeather(cityDet.Key);

    return { cityDet, weatDet };
}

cityForm.addEventListener('submit', e => {
//prevent default action
e.preventDefault();

//get city value
const cityValue = cityForm.city.value.trim();
cityForm.reset();

getCityData(cityValue)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

localStorage.setItem('city',cityValue);

});

if(localStorage.getItem('city')){
    getCityData(localStorage.getItem('city'))
        .then(data => updateUI(data))
        .catch(err => console.log(err));
}



//console.log(getCityData("Manchester"));
