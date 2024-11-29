<template>
  <div>
    <h1>AI Chat</h1>
    <textarea v-model="userMessage" placeholder="Bir şeyler yazın..."></textarea>
    <button @click="generateContent">İçerik Oluştur</button>
    
    <div v-if="result">
      <h2>AI Yanıtı:</h2>
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userMessage: '',
      result: null,
    };
  },
  methods: {
    async generateContent() {
  if (this.userMessage.trim() === '') return; 

  try {
    const response = await fetch('http://localhost:3000/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: this.userMessage }),
    });

   
    const responseText = await response.text();
    console.log('Server Response:', responseText);  

   
    if (!response.ok) {
      throw new Error(`Sunucudan geçersiz yanıt alındı: ${response.status}`);
    }

    this.result = responseText || "Yanıt alınamadı"; 

  } catch (error) {
    console.error("Hata oluştu:", error);
    this.result = `Bir hata oluştu: ${error.message}. Lütfen tekrar deneyin.`;
  }
}

  },
};
</script>

<style scoped>

textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

div {
  margin-top: 20px;
}
</style>
