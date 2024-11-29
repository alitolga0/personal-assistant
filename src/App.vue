<template>
  <div id="app">
    <header>
      <h1>🌟 Kişisel Asistan</h1>
    </header>

   
    <button class="mobile-menu-toggle" @click="toggleMobileMenu">
      <span v-if="!isMobileMenuOpen" class="bar"></span>
      <span v-if="!isMobileMenuOpen" class="bar"></span>
      <span v-if="!isMobileMenuOpen" class="bar"></span>
      <span v-if="isMobileMenuOpen" class="close-icon">×</span>
    </button>

   
    <nav :class="{ 'mobile-open': isMobileMenuOpen }">
      <ul>
        <li v-for="item in menuItems" :key="item.id" :class="{ active: activePage === item.id }" @click="setActivePage(item.id)">
          {{ item.name }}
        </li>
      </ul>
    </nav>

    <main>
      <div v-if="activePage === 'habits'">
        <MyHabits />
      </div>
      <div v-else-if="activePage === 'tasks'">
        <MyTasks />
      </div>
      <div v-else-if="activePage === 'smokingTracker'">
        <SmokingTracker />
      </div>
      <div v-else-if="activePage === 'timers'">
        <MyTimers />
      </div>
      <div v-else-if="activePage === 'chatbox'">
        <myGemini />
      </div>
    </main>
  </div>
</template>
<script>
import MyHabits from './components/MyHabits.vue';
import MyTasks from './components/MyTasks.vue';
import SmokingTracker from './components/SmokingTracker.vue';
import MyTimers from './components/MyTimers.vue';
import myGemini from '../server/Gemini.vue';

export default {
  data() {
    return {
      activePage: 'habits',
      menuItems: [
        { id: 'habits', name: 'Alışkanlıklar' },
        { id: 'tasks', name: 'Görevler' },
        { id: 'smokingTracker', name: 'Sigara Bırakma Takibi' },
        { id: 'timers', name: 'Zamanlayıcı' },
        { id: 'chatbox', name: 'Chatbox' },
      ],
      isMobileMenuOpen: false, 
    };
  },
  methods: {
    setActivePage(pageId) {
      this.activePage = pageId;
      if (this.isMobileMenuOpen) {
        this.toggleMobileMenu(); 
      }
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
  },
  components: {
    MyHabits,
    MyTasks,
    SmokingTracker,
    MyTimers,
    myGemini,
  },
};
</script>
<style scoped>
/* Temel gövde stilleri */
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f9fafc;
  color: #333;
  margin: 0;
  padding: 0;
}


header {
  background-color: #4caf50;
  color: white;
  text-align: center;
  padding: 1.5rem 0;
  font-size: 1.8rem;
  font-weight: bold;
}


.mobile-menu-toggle {
  display: none;
  background-color: transparent;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
}

.mobile-menu-toggle .bar {
  display: block;
  width: 30px;
  height: 4px;
  margin: 6px 0;
  background-color: #333; 
  transition: 0.3s;
}

.mobile-menu-toggle .close-icon {
  font-size: 2rem;
  color: #333; 
}


nav {
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

nav li {
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

nav li:hover {
  background-color: #f4f4f4;
}

nav li.active {
  font-weight: bold;
  color: #4caf50;
  border-bottom: 2px solid #4caf50;
}


main {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}

main > div {
  animation: fadeIn 0.5s ease-in-out;
}


@media (max-width: 768px) {

  .mobile-menu-toggle {
    display: block;
  }

  nav {
    display: none; 
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
    padding-top: 60px;
    z-index: 9;
  }

  nav.mobile-open {
    display: flex;
    animation: slideIn 0.3s ease-in-out;
  }

  nav li {
    padding: 1rem;
    font-size: 1.5rem;
    text-align: center;
    width: 100%;
    border-bottom: 1px solid #ddd;
  }

  main {
    padding: 1.5rem;
    max-width: 100%;
  }
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
  }
  to {
    transform: translateX(0);
  }
}

@media (max-width: 480px) {

  header {
    font-size: 1.2rem;
  }

  nav li {
    font-size: 1.2rem;
    padding: 1rem;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
