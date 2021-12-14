const enter = document.querySelector('input');
const btn = document.getElementById('btn');
const cloud = document.getElementById('cloud');
const wind = document.getElementById('wind');
const humidity = document.getElementById('humidity');
const num_cloud = document.getElementById('num-cloud');
const num_wind = document.getElementById('num-wind');
const num_humidity = document.getElementById('num-humidity');
const num_temp = document.getElementById('num-temp');
const min_temp = document.getElementById('min-temp');
const max_temp = document.getElementById('max-temp');
const temp = document.getElementById('temp');
const city = document.getElementById('city');
const weather_type = document.getElementById('weather-type');
const state_cloud = document.querySelector('.state-cloud');
const state_sunny = document.querySelector('.state-sunny');
const state_rain = document.querySelector('.state-rain');
const app = document.querySelector('.app');

class Weather {
    
    constructor() {
    }   

    getData() {
        btn.addEventListener('click', () => {
            if(enter.value == false) return;
            num_cloud.innerText = '';
            num_wind.innerText = '';
            num_humidity.innerText = '';
            num_temp.innerText = '';
            min_temp.innerText = '';
            max_temp.innerText = '';
            temp.innerText = '';
            city.innerText = '';
            weather_type.innerText = '';
            state_cloud.style.display = 'none';
            state_sunny.style.display = 'none';
            state_rain.style.display = 'none';
            if(enter.value) return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${enter.value}&appid=15e1759485d66db1612c47ce9f8fd941`)
                                        .then(data=>data.json())
                                        .then(data=>{
                                            enter.value = '';
                                            num_cloud.append(data.clouds.all);
                                            num_wind.append(data.wind.speed);
                                            num_humidity.append(data.main.humidity);
                                            num_temp.append(Math.round(data.main.temp - 273.15));
                                            max_temp.append('↑' + Math.round(data.main.temp_max - 273.15));
                                            min_temp.append('↓' + Math.round(data.main.temp_min - 273.15));
                                            temp.append('°C');
                                            city.append(data.name + ", " + data.sys.country);
                                            weather_type.append(data.weather[0].main);
                                            if(data.weather[0].main == 'Clear') {
                                                weather_type.innerText = 'Sunny';
                                                state_sunny.style.display = 'block';
                                            } else if(data.weather[0].main == 'Clouds' || data.weather[0].main == 'Mist' || data.weather[0].main == 'Haze') {
                                                state_cloud.style.display = 'block';
                                            } else if (data.weather[0].main == 'Rain') {
                                                state_rain.style.display = 'block';
                                            }
					  console.log(data);
                                        })
                                        .catch(error => {
                                            enter.value = "Re-enter!";
                                            enter.style.color = 'red';
                                        })
        })
    }
}
setInterval(function () {
    let time = new Date();
    if(5 >= time.getHours() >= 18) app.style.background = 'pink';
    document.getElementById('current_date_time_block2').innerHTML = time.getHours() + ' ' + time.getMinutes() + ' ' + time.getSeconds();
}, 1000);

new Weather().getData();