<template>
  <div class="smoking-tracker">
    <h2>Sigara Bırakma Takibi</h2>

    <div class="stat-card">
      <p><strong>Sigara İçmediğiniz Süre:</strong></p>
      <p class="highlight-text">{{ daysWithoutCigarette }} gün</p>
    </div>

    <div class="stat-card">
      <p><strong>Tasarruf Edilen Para:</strong></p>
      <p class="highlight-text">{{ moneySaved }} TL</p>
    </div>

    <div class="health-card">
      <p><strong>Sağlık İyileşmesi:</strong></p>
      <ul>
        <li><i class="fas fa-lungs"></i> Akciğer kapasiteniz iyileşiyor!</li>
        <li><i class="fas fa-heartbeat"></i> Kan basıncınız düşmeye başladı!</li>
      </ul>
    </div>

    <div>
      <button @click="startOver" v-if="smokedToday" class="reset-btn">Tekrar Başla</button>
    </div>

    <div>
      <p><strong>Bugün Sigara İçtiğiniz Mi?</strong></p>
      <button @click="markTodayAsSmoked" class="action-btn">Evet</button>
      <button @click="markTodayAsNotSmoked" class="action-btn">Hayır</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "smokingTracker",
  data() {
    return {
      daysWithoutCigarette: 0,   
      moneySaved: 0,             
      smokedToday: false,     
    };
  },
  mounted() {
    this.loadDataFromLocalStorage();
  },
  methods: {
    loadDataFromLocalStorage() {
      const savedData = localStorage.getItem('smokingTrackerData');
      if (savedData) {
        const { daysWithoutCigarette, moneySaved, smokedToday } = JSON.parse(savedData);
        this.daysWithoutCigarette = daysWithoutCigarette || 0;
        this.moneySaved = moneySaved || 0;
        this.smokedToday = smokedToday || false;
      }
    },

    saveDataToLocalStorage() {
      const data = {
        daysWithoutCigarette: this.daysWithoutCigarette,
        moneySaved: this.moneySaved,
        smokedToday: this.smokedToday,
      };
      localStorage.setItem('smokingTrackerData', JSON.stringify(data));
    },

    startOver() {
      this.daysWithoutCigarette = 0;
      this.smokedToday = false;
      this.moneySaved = 0;
      this.saveDataToLocalStorage();
    },

    markTodayAsNotSmoked() {
      this.smokedToday = false;
      this.daysWithoutCigarette++;  
      this.moneySaved += 75;         
      this.saveDataToLocalStorage();
    },

    markTodayAsSmoked() {
      this.smokedToday = true;
      alert('Bugün sigara içtiniz, hedefinize tekrar odaklanın!');
      this.saveDataToLocalStorage();
    },
  },

  watch: {
    daysWithoutCigarette() {
      this.saveDataToLocalStorage();
    },
    moneySaved() {
      this.saveDataToLocalStorage();
    },
    smokedToday() {
      this.saveDataToLocalStorage();
    },
  },
};
</script>





  
  <style scoped>
  .smoking-tracker {
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 10px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  .smoking-tracker h2 {
    text-align: center;
    color: #4caf50;
    font-size: 1.8rem;
    font-weight: bold;
  }
  
 
  .stat-card {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .highlight-text {
    font-size: 2rem;
    color: #4caf50;
    font-weight: bold;
  }
  
 
  .health-card {
    background-color: #ffffff;
    border-radius: 10px;
    padding: 20px;
    margin-bottom: 20px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  .health-card ul {
    list-style: none;
    padding: 0;
    font-size: 1.1rem;
    color: #333;
  }
  
  .health-card li {
    margin-bottom: 10px;
  }
  
  .health-card i {
    color: #4caf50;
    margin-right: 10px;
  }
  

  button {
    background-color: #4caf50;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    font-size: 1rem;
    transition: background-color 0.3s ease;
  }
  
  button:hover {
    background-color: #45a049;
  }
  
  .reset-btn {
    background-color: #ff9800;
  }
  
  .reset-btn:hover {
    background-color: #f57c00;
  }
  
  .action-btn {
    width: 48%;
    display: inline-block;
    margin-right: 2%;
  }
  
  input {
    padding: 8px;
    margin: 10px 0;
    width: 100%;
    border-radius: 5px;
    border: 1px solid #ccc;
  }
  </style>
  