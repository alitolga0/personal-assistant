<template>
    <div class="smoking-tracker">
      <h2>Sigara Bırakma Takibi</h2>
  
      <!-- Sigara içmeme süresi -->
      <div class="stat-card">
        <p><strong>Sigara İçmediğiniz Süre:</strong></p>
        <p class="highlight-text">{{ daysWithoutCigarette }} gün</p>
      </div>
  
      <!-- Tasarruf Edilen Para -->
      <div class="stat-card">
        <p><strong>Tasarruf Edilen Para:</strong></p>
        <p class="highlight-text">{{ moneySaved }} TL</p>
      </div>
  
      <!-- Sağlık İyileşmesi -->
      <div class="health-card">
        <p><strong>Sağlık İyileşmesi:</strong></p>
        <ul>
          <li><i class="fas fa-lungs"></i> Akciğer kapasiteniz iyileşiyor!</li>
          <li><i class="fas fa-heartbeat"></i> Kan basıncınız düşmeye başladı!</li>
        </ul>
      </div>
  
      <!-- Sigara içmeme günü kaydetme -->
      <div>
        <button @click="startOver" v-if="smokedToday" class="reset-btn">Tekrar Başla</button>
      </div>
  
      <!-- Günlük İlerleme -->
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
        daysWithoutCigarette: 0,   // Sigara içilmeyen gün sayısı (başlangıçta 0)
        moneySaved: 0,             // Tasarruf edilen para
        smokedToday: false,        // Bugün sigara içildi mi?
      };
    },
    methods: {
      // Sigara içmeye başlanırsa resetle
      startOver() {
        this.daysWithoutCigarette = 0;
        this.smokedToday = false;
        this.moneySaved = 0;
      },
  
      // Sigara içmediği günü kaydet
      markTodayAsNotSmoked() {
        this.smokedToday = false;
        this.daysWithoutCigarette++;  // Sigara içmeme süresi 1 arttırılır
        this.moneySaved += 75;         // Her gün sigara içilmeyen günde tasarruf edilen 75 TL
      },
  
      // Sigara içildiğinde kaydet
      markTodayAsSmoked() {
        this.smokedToday = true;
        alert('Bugün sigara içtiniz, hedefinize tekrar odaklanın!');
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
  
  /* Stat Card Design (Sigara İçilmeyen Gün ve Tasarruf Bilgisi) */
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
  
  /* Sağlık İyileşmesi Kartı */
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
  
  /* Butonlar */
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
  