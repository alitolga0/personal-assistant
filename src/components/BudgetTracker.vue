<template>
    <div class="budget-tracker">
      <h2>Bütçe Takibi</h2>
      
      <div class="budget-stat">
        <p>Mevcut Bütçe: {{ currentBudget }} ₺</p>
        <p>Gelir: {{ income }} ₺</p>
        <p>Gider: {{ expenses }} ₺</p>
      </div>
  
      <div class="inputs">
        <input v-model="amountInput" type="number" placeholder="Miktar" />
      </div>
  
      <div class="buttons">
        <button @click="addIncome">Gelir Ekle</button>
        <button @click="addExpense">Gider Ekle</button>
        <button @click="resetBudget">Bütçeyi Sıfırla</button>
      </div>
  
      <div v-if="budgetExceeded" class="alert">
        <p>Uyarı: Bütçeniz aşılmış durumda!</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "BudgetTracker",
    data() {
      return {
        currentBudget: 0, // Başlangıçta mevcut bütçe
        income: 0, // Kullanıcının gelir miktarı
        expenses: 0, // Kullanıcının gider miktarı
        amountInput: 0, // Gelir veya gider miktarı için input
        budgetExceeded: false, // Bütçe aşıldığında gösterilecek durum
      };
    },
    methods: {
      // Gelir ekleme fonksiyonu
      addIncome() {
        if (this.amountInput > 0) {
          this.income += parseFloat(this.amountInput);
          this.currentBudget += parseFloat(this.amountInput);
          this.amountInput = 0; // Inputu sıfırlama
          this.saveBudgetData(); // Veriyi kaydet
          this.checkBudget();
        }
      },
      // Gider ekleme fonksiyonu
      addExpense() {
        if (this.amountInput > 0) {
          this.expenses += parseFloat(this.amountInput);
          this.currentBudget -= parseFloat(this.amountInput);
          this.amountInput = 0; // Inputu sıfırlama
          this.saveBudgetData(); // Veriyi kaydet
          this.checkBudget();
        }
      },
      // Bütçeyi sıfırlama fonksiyonu
      resetBudget() {
        this.currentBudget = 0;
        this.income = 0;
        this.expenses = 0;
        this.amountInput = 0;
        this.budgetExceeded = false;
        this.saveBudgetData(); // Veriyi kaydet
      },
      // Bütçeyi kontrol etme fonksiyonu
      checkBudget() {
        if (this.currentBudget < 0) {
          this.budgetExceeded = true;
        } else {
          this.budgetExceeded = false;
        }
      },
      // Verileri localStorage'a kaydetme fonksiyonu
      saveBudgetData() {
        localStorage.setItem("currentBudget", this.currentBudget);
        localStorage.setItem("income", this.income);
        localStorage.setItem("expenses", this.expenses);
      },
      // Verileri localStorage'tan yükleme fonksiyonu
      loadBudgetData() {
        const storedBudget = localStorage.getItem("currentBudget");
        const storedIncome = localStorage.getItem("income");
        const storedExpenses = localStorage.getItem("expenses");
  
        if (storedBudget !== null) {
          this.currentBudget = parseFloat(storedBudget);
        }
        if (storedIncome !== null) {
          this.income = parseFloat(storedIncome);
        }
        if (storedExpenses !== null) {
          this.expenses = parseFloat(storedExpenses);
        }
      }
    },
    mounted() {
      this.loadBudgetData(); // Sayfa yüklendiğinde verileri yükle
    },
    watch: {
      currentBudget() {
        this.checkBudget(); // Bütçe değiştiğinde kontrol et
      },
    },
  };
  </script>
  
  <style scoped>
  .budget-tracker {
    text-align: center;
    padding: 20px;
    background-color: #f8f9fa; /* Gri */
    border-radius: 10px;
    max-width: 400px;
    margin: 0 auto;
  }
  
  .budget-stat {
    margin: 20px 0;
  }
  
  .inputs input {
    margin: 10px;
    padding: 10px;
    width: 100%;
    max-width: 200px;
    border-radius: 5px;
    border: 1px solid #ccc;
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
  
  .alert {
    margin-top: 20px;
    background-color: #e53935;
    color: white;
    padding: 10px;
    border-radius: 5px;
  }
  </style>
  