<template>
  <div class="timer-container">
    <h2 class="timer-title">Zamanlayıcı</h2>
    <div class="timer-display">
      <p class="timer-text">{{ timerTime }} saniye</p>
    </div>
    <div class="timer-controls">
      <button @click="startTimer" :disabled="isTimerActive" class="start-btn">Başlat</button>
      <button @click="stopTimer" :disabled="!isTimerActive" class="stop-btn">Durdur</button>
      <button @click="resetTimer" :disabled="!timerTime" class="reset-btn">Sıfırla</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MyTimers",
  data() {
    return {
      timerTime: 0,
      isTimerActive: false,
      timerInterval: null,
    };
  },
  methods: {
    startTimer() {
      this.isTimerActive = true;
      this.timerInterval = setInterval(() => {
        this.timerTime++;
      }, 1000);
    },
    stopTimer() {
      this.isTimerActive = false;
      clearInterval(this.timerInterval);
    },
    resetTimer() {
      this.timerTime = 0;
    },
  },
};
</script>
<style scoped>
.timer-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.timer-title {
  font-size: 1.8rem;
  color: #4caf50;
  margin-bottom: 20px;
}

.timer-display {
  background-color: #ffffff;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

.timer-text {
  font-size: 3rem;
  color: #4caf50;
  font-weight: bold;
}

.timer-controls button {
  padding: 12px 20px;
  border-radius: 5px;
  border: none;
  font-size: 1.1rem;
  margin: 0 10px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.start-btn {
  background-color: #4caf50;
  color: white;
}

.start-btn:hover {
  background-color: #45a049;
}

.stop-btn {
  background-color: #ff9800;
  color: white;
}

.stop-btn:hover {
  background-color: #f57c00;
}

.reset-btn {
  background-color: #f44336;
  color: white;
}

.reset-btn:hover {
  background-color: #e53935;
}

@media (max-width: 768px) {
  .timer-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .timer-controls button {
    width: 100%;
    margin: 10px 0;
  }
}
</style>
