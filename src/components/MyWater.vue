<template>
  <div class="water-reminder">
    <h2>Su İçme Hatırlatıcısı</h2>
    <p>Bugün kaç bardak su içtiniz?</p>

    <div class="water-stat">
      <p>{{ currentWaterIntake }} / {{ totalWaterGoal }} bardak</p>
      <progress :value="currentWaterIntake" :max="totalWaterGoal"></progress>
    </div>

    <div class="buttons">
      <button @click="incrementWaterIntake">Bir Bardak Su İçtim</button>
      <button @click="resetWaterIntake">Sıfırla</button>
    </div>

    <div v-if="isTimeToDrink" class="reminder">
      <p>Su içmeyi unutmayın! Bir bardak su içme zamanı.</p>
    </div>

    <div v-if="waterGoalReached" class="success">
      <p>Tebrikler! Bugün su içme hedefinizi başardınız!</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyWater",
  data() {
    return {
      currentWaterIntake: 0, 
      totalWaterGoal: 8, 
      waterGoalReached: false, 
      isTimeToDrink: false, 
    };
  },
  mounted() {
    this.startReminderTimer();
    this.startDailyReset(); 
    this.loadDataFromLocalStorage(); 
  },
  methods: {
    incrementWaterIntake() {
      if (this.currentWaterIntake < this.totalWaterGoal) {
        this.currentWaterIntake++;
        if (this.currentWaterIntake === this.totalWaterGoal) {
          this.waterGoalReached = true;
        }
      }
      this.saveDataToLocalStorage();
    },
    resetWaterIntake() {
      this.currentWaterIntake = 0;
      this.waterGoalReached = false;
      this.saveDataToLocalStorage();
    },
    startReminderTimer() {
      setInterval(() => {
        this.isTimeToDrink = true;
        setTimeout(() => {
          this.isTimeToDrink = false;
        }, 5000); 
      }, 3600000); 
    },
    startDailyReset() {
      
      const resetTime = new Date();
      resetTime.setHours(0, 0, 0, 0); 

      const timeToNextReset = resetTime.getTime() - new Date().getTime();
      const oneDay = 24 * 60 * 60 * 1000; 

      
      setTimeout(() => {
        this.resetWaterIntake(); 
        setInterval(this.resetWaterIntake, oneDay); 
      }, timeToNextReset < 0 ? oneDay + timeToNextReset : timeToNextReset); 
    },
    saveDataToLocalStorage() {
      const data = {
        currentWaterIntake: this.currentWaterIntake,
        waterGoalReached: this.waterGoalReached,
      };
      localStorage.setItem('waterReminderData', JSON.stringify(data));
    },
    loadDataFromLocalStorage() {
      const savedData = localStorage.getItem('waterReminderData');
      if (savedData) {
        const { currentWaterIntake, waterGoalReached } = JSON.parse(savedData);
        this.currentWaterIntake = currentWaterIntake || 0;
        this.waterGoalReached = waterGoalReached || false;
      }
    },
  },
  watch: {
    currentWaterIntake(newValue) {
      if (newValue >= this.totalWaterGoal) {
        this.waterGoalReached = true;
      }
    },
  },
};
</script>

<style scoped>

.water-reminder {
  text-align: center;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  max-width: 400px;
  margin: 0 auto;
}

.water-stat {
  margin: 20px 0;
}

progress {
  width: 100%;
  height: 20px;
  margin-top: 10px;
}

.buttons button {
  padding: 12px 25px;
  margin: 10px;
  background-color: #4caf50; 
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.buttons button:hover {
  background-color: #45a049; 
}

.reminder {
  margin-top: 20px;
  background-color: #ffeb3b; 
  padding: 10px;
  border-radius: 5px;
}

.success {
  margin-top: 20px;
  background-color: #4caf50; 
  color: white;
  padding: 10px;
  border-radius: 5px;
}
</style>

