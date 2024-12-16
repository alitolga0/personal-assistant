<template>
    <div class="calendar-container">
      <div class="calendar-header">
        <button @click="previousMonth" class="calendar-nav-button">←</button>
        <span class="calendar-month">{{ monthName }}</span>
        <span class="calendar-year">{{ currentYear }}</span>
        <button @click="nextMonth" class="calendar-nav-button">→</button>
      </div>
      <div class="calendar-days">
        <div v-for="(day, index) in daysOfWeek" :key="index" class="calendar-day">
          {{ day }}
        </div>
      </div>
      <div class="calendar-grid">
        <div
          v-for="(day, index) in daysInMonth"
          :key="index"
          :class="['calendar-day-cell', { today: isToday(day) }]"
          @click="selectDay(day)"
        >
        
          <span v-if="day">{{ day.date() }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import moment from 'moment';
  moment.locale("tr");
  export default {
    data() {
      return {
        currentDate: moment(), 
        selectedDate: null, 
      };
    },
    computed: {
      currentYear() {
        return this.currentDate.year();
      },
      monthName() {
        return this.currentDate.format('MMMM'); 
      },
      daysOfWeek() {
        return ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt']; 
      },
      daysInMonth() {
        const startOfMonth = this.currentDate.clone().startOf('month'); 
        const endOfMonth = this.currentDate.clone().endOf('month'); 
        const days = [];
  
   
        for (let i = 0; i < startOfMonth.day(); i++) {
          days.push(null); 
        }
  
        
        for (let i = 1; i <= endOfMonth.date(); i++) {
          days.push(this.currentDate.clone().date(i));
        }
  
        return days; 
      },
    },
    methods: {
      isToday(day) {
        return day && day.isSame(moment(), 'day'); 
      },
      selectDay(day) {
        if (day) {
          this.selectedDate = day; 
        }
      },
      
      previousMonth() {
        this.currentDate = this.currentDate.clone().subtract(1, 'month');
      },
    
      nextMonth() {
        this.currentDate = this.currentDate.clone().add(1, 'month');
      }
    },
  };
  </script>
  
  <style scoped>
 
  .calendar-container {
    width: 100%;
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
  
 
  .calendar-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    align-items: center;
  }
  
 
  .calendar-nav-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: #4caf50;
  }
  
 
  .calendar-days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    margin-bottom: 10px;
    text-align: center;
    font-weight: bold;
  }
  
  
  .calendar-grid {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 5px;
  }
  

  .calendar-day-cell {
    padding: 15px;
    text-align: center;
    cursor: pointer;
    border-radius: 5px;
    transition: background-color 0.2s;
    font-size: 1.1rem;
  }
  
  
  .calendar-day-cell:hover {
    background-color: #f0f0f0;
  }
  
  
  .calendar-day-cell.today {
    background-color: #4caf50;
    color: white;
  }
  
  
  .selected-date {
    margin-top: 15px;
    font-size: 1.2rem;
    font-weight: bold;
    color: #333;
  }
  
  
  @media (max-width: 768px) {
    .calendar-container {
      padding: 15px;
    }
  
    .calendar-header {
      font-size: 1.3rem;
    }
  
    .calendar-days {
      grid-template-columns: repeat(7, 1fr);
      margin-bottom: 8px;
    }
  
    .calendar-grid {
      grid-template-columns: repeat(7, 1fr);
      gap: 2px;
    }
  
    .calendar-day-cell {
      padding: 12px;
      font-size: 1rem;
    }
  
    .calendar-day-cell.today {
      background-color: #4caf50;
      color: white;
    }
  }
  
  
  @media (max-width: 480px) {
    .calendar-container {
      padding: 10px;
    }
  
    .calendar-header {
      font-size: 1.1rem;
    }
  
    .calendar-days {
      grid-template-columns: repeat(7, 1fr);
      font-size: 0.9rem;
    }
  
    .calendar-grid {
      gap: 1px;
    }
  
    .calendar-day-cell {
      padding: 10px;
      font-size: 0.9rem;
    }
  
    .calendar-day-cell.today {
      background-color: #4caf50;
      color: white;
    }
  }
  </style>
  