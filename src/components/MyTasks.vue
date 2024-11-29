<template>
  <div class="tasks-container">
    <h2 class="title">Haftalık Görevler</h2>
    <ul class="task-list">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <input
          type="checkbox"
          v-model="task.completed"
          :id="'task-' + task.id"
          class="task-checkbox"
        />
        <label :for="'task-' + task.id" :class="{ completed: task.completed }">{{ task.name }}</label>
        <button @click="deleteTask(task.id)" class="delete-btn">Sil</button>
      </li>
    </ul>

    <form @submit.prevent="addTask" class="task-form">
      <input v-model="newTaskName" placeholder="Yeni görev adı" class="task-input" />
      <button type="submit" class="add-btn">Ekle</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'MyTasks',
  data() {
    return {
      tasks: [
        { id: 1, name: 'Ev ödevini yap', completed: false },
        { id: 2, name: 'Alışverişe git', completed: true },
        { id: 3, name: 'Temizlik yap', completed: false },
      ],
      newTaskName: '',
    };
  },
  methods: {
    addTask() {
      if (this.newTaskName) {
        const newTask = {
          id: this.tasks.length + 1,
          name: this.newTaskName,
          completed: false,
        };
        this.tasks.push(newTask);
        this.newTaskName = '';
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(task => task.id !== id);
    },
  },
};
</script>

<style scoped>
.tasks-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s;
}

.task-item:hover {
  background-color: #f1f1f1;
}

.task-checkbox {
  margin-right: 10px;
  accent-color: #4caf50;
}

label {
  flex-grow: 1;
  font-size: 1.1rem;
  color: #333;
  transition: color 0.3s;
}

label.completed {
  color: #4caf50;
  text-decoration: line-through;
}

.delete-btn {
  background-color: #e53935;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #d32f2f;
}

.task-form {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.task-input {
  flex-grow: 1;
  padding: 10px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
}

.add-btn {
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.add-btn:hover {
  background-color: #45a049;
}
</style>
