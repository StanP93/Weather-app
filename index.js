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
const state_snow = document.querySelector('.state-snow');
const state_bolt = document.querySelector('.state-bolt');
const app = document.querySelector('.app');

class Weather {
    constructor() {
    }   
    getTime() {
        setInterval(function () {
            let time = new Date();
            document.getElementById('current_date_time_block2').innerHTML = time.getHours() + ' ' + time.getMinutes() + ' ' + time.getSeconds();
        }, 1000);
    }
    delElem() {
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
        state_snow.style.display = 'none';
        state_bolt.style.display = 'none';
    }
    getData() {
        btn.addEventListener('click', async () => {
            if(enter.value == false) return;
            this.delElem();
            if(enter.value) try {
                const data = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${enter.value}&appid=15e1759485d66db1612c47ce9f8fd941`);
                const data_1 = await data.json();
                enter.value = '';
                num_cloud.append(data_1.clouds.all + '%');
                num_wind.append((data_1.wind.speed).toFixed(1) + ' m/s');
                num_humidity.append(data_1.main.humidity + '%');
                num_temp.append(Math.round(data_1.main.temp - 273.15));
                max_temp.append('↑' + Math.round(data_1.main.temp_max - 273.15));
                min_temp.append('↓' + Math.round(data_1.main.temp_min - 273.15));
                temp.append('°C');
                city.append(data_1.name + ", " + data_1.sys.country);
                weather_type.append(data_1.weather[0].main);
                if (data_1.weather[0].main == 'Clear') {
                    weather_type.innerText = 'Sunny';
                    state_sunny.style.display = 'block';
                } else if (data_1.weather[0].main == 'Clouds' || data_1.weather[0].main == 'Mist' || data_1.weather[0].main == 'Haze') {
                    state_cloud.style.display = 'block';
                } else if (data_1.weather[0].main == 'Rain') {
                    state_rain.style.display = 'block';
                } else if (data_1.weather[0].main == 'Snow') {
                    state_snow.style.display = 'block';
                } else if (data_1.weather[0].main == 'Thunderstorm') {
                    state_bolt.style.display = 'block';
                }
            } catch (error) {
                enter.value = "Re-enter!";
                enter.style.color = 'red';
            }
        }) 
    }
    run() {
        this.getData();
        this.getTime(); 
    }
}

new Weather().run();