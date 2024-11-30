<template>
  <div>
    <h2>📋 Günlük Alışkanlıklar</h2>
    <div class="habit-list">
      <div class="habit-card" v-for="habit in habits" :key="habit.id">
        <h3>{{ habit.name }}</h3>
        <p>🕒 Saat: {{ habit.time }}</p>
        <button @click="editHabit(habit.id)">✏️ Düzenle</button>
        <button @click="deleteHabit(habit.id)">❌ Sil</button>
      </div>
    </div>
    <form @submit.prevent="addHabit" class="habit-form">
      <input v-model="newHabitName" placeholder="Alışkanlık adı" />
      <input v-model="newHabitTime" placeholder="Saat (örn. 08:00)" />
      <button type="submit">➕ Ekle</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "MyHabits",
  data() {
    return {
      habits: [],
      newHabitName: "",
      newHabitTime: "",
    };
  },
  mounted() {
   
    const savedHabits = localStorage.getItem("habits");
    if (savedHabits) {
      this.habits = JSON.parse(savedHabits);
    }
  },
  methods: {
    saveToLocalStorage() {
      localStorage.setItem("habits", JSON.stringify(this.habits));
    },
    addHabit() {
      if (this.newHabitName && this.newHabitTime) {
        const newHabit = {
          id: Date.now(), 
          name: this.newHabitName,
          time: this.newHabitTime,
        };
        this.habits.push(newHabit);
        this.saveToLocalStorage();
        this.newHabitName = "";
        this.newHabitTime = "";
      }
    },
    deleteHabit(id) {
      this.habits = this.habits.filter((habit) => habit.id !== id);
      this.saveToLocalStorage();
    },
    editHabit(id) {
      const habit = this.habits.find((h) => h.id === id);
      if (habit) {
        this.newHabitName = habit.name;
        this.newHabitTime = habit.time;
        this.deleteHabit(id); 
      }
    },
  },
};
</script>

<style scoped>

h2 {
  text-align: center;
  margin-bottom: 1rem;
  color: #4caf50;
}

.habit-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.habit-card {
  background-color: #f4f4f4;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.habit-card button {
  margin: 0.5rem;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.habit-card button:hover {
  background-color: #ddd;
}

.habit-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
  align-items: center;
}

.habit-form input {
  padding: 0.5rem;
  width: 100%;
  max-width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.habit-form button {
  padding: 0.5rem 1rem;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.habit-form button:hover {
  background-color: #45a049;
}
</style>
