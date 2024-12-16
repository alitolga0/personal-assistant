<template>
    <div class="app">
      <div class="header">
        <h1>Hava Durumu</h1>
        <input type="text" v-model="cityName" @keyup.enter="getResult" placeholder="Şehir giriniz" />
      </div>  
      <div class="content">
        <div class="city">{{ city }}, {{ country }}</div>
        <div class="temp">{{ temp }}°C</div>
        <div class="desc">{{ description }}</div>
        <div class="minmax">{{ tempMin }}°C / {{ tempMax }}°C</div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'MyWeather',
    data() {
      return {
        cityName: '',
        city: 'İstanbul',
        country: 'TR',
        temp: 15,
        description: 'Güneşli',
        tempMin: 15,
        tempMax: 19,
      };
    },
    methods: {
      async getResult() {
        if (this.cityName.trim() === '') return;
  
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        const key = "c990bc5c65f86ac5fb4b1e31e3478436";
        let query = `${url}?q=${this.cityName}&appid=${key}&units=metric&lang=tr`;
  
        try {
          const response = await fetch(query);
          const result = await response.json();
  
          if (result.cod === 200) {
            this.city = result.name;
            this.country = result.sys.country;
            this.temp = Math.round(result.main.temp);
            this.description = result.weather[0].description.toUpperCase();
            this.tempMin = Math.round(result.main.temp_min);
            this.tempMax = Math.round(result.main.temp_max);
          } else {
            alert('Şehir bulunamadı');
          }
        } catch (error) {
          alert('Bir hata oluştu');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  body {
    font-family: 'Montserrat', sans-serif;
    background-color: #f8f9fa;
    color: #333;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  
.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background-color: #fff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  min-width: 320px; 
  margin: 0 auto;
}
  
  .header {
    padding: 20px;
  }
  
  .header h1 {
    font-size: 2.5rem;
    color: #4caf50; 
    text-shadow: 1px 3px rgba(0, 0, 0, 0.5);
  }
  
  .header input {
    width: 100%;
    padding: 10px;
    background: transparent;
    border: 2px solid #4caf50; 
    text-align: center;
    font-size: 1.2rem;
    color: #333;
    border-radius: 5px;
    margin-top: 10px;
  }
  
  .content {
    margin-top: 20px;
  }
  
  .city {
    font-size: 1.8rem;
    font-weight: 500;
    margin-bottom: 10px;
    color: #333;
  }
  
  .temp {
    font-size: 4rem;
    font-weight: 700;
    margin-bottom: 10px;
    color: #e53935; 
  }
  
  .desc {
    font-size: 1.5rem;
    font-style: italic;
    color: #777;
    margin-bottom: 10px;
  }
  
  .minmax {
    font-size: 1.2rem;
    color: #4caf50; 
  }
  
  @media (max-width: 768px) {
    .app {
      padding: 20px;
      width: 100%; 
    }
  
    .header h1 {
      font-size: 2rem;
    }
  
    .header input {
      font-size: 1rem;
    }
  
    .city {
      font-size: 1.5rem;
    }
  
    .temp {
      font-size: 3rem;
    }
  
    .desc {
      font-size: 1.2rem;
    }
  
    .minmax {
      font-size: 1rem;
    }
  }
  </style>
  