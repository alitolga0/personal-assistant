<template>
  <div>
    <h1>Kişisel Asistan</h1>
    <div class="chat-container">
      <div class="message-container" v-for="(message, index) in messages" :key="index">
        <div class="user-message" v-if="message.role === 'user'">
          <strong>Kullanıcı:</strong> {{ message.text }}
        </div>
        <div class="assistant-message" v-if="message.role === 'assistant'">
          <strong>Asistan:</strong> {{ message.text }}
        </div>
      </div>
    </div>

    <textarea v-model="prompt" rows="4" cols="50" placeholder="Soru sor ya da komut ver..."></textarea><br>
    <button @click="generateResponse">Yanıt Al</button>
  </div>
</template>

<script>
import { GoogleGenerativeAI } from "@google/generative-ai";

export default {
  name: "PersonalAssistant",
  data() {
    return {
      prompt: '',  // Kullanıcıdan gelen soru ya da komut
      messages: [],  // Sohbet mesajları
      API_KEY: 'AIzaSyBQqQ2p2L3X_s66qUC57RuF5Jh2gWGr55Y',  // API anahtarınız
      genAI: null,
      model: null
    };
  },
  mounted() {
    this.genAI = new GoogleGenerativeAI(this.API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  },
  methods: {
    async generateResponse() {
      // Kullanıcı mesajını sohbet geçmişine ekle
      this.messages.push({ role: 'user', text: this.prompt });

      try {
        // API'den yanıt al
        const response = await this.model.generateContent(this.prompt);
        const assistantMessage = response.response.candidates[0].content.parts[0].text;

        // Asistanın yanıtını sohbet geçmişine ekle
        this.messages.push({ role: 'assistant', text: assistantMessage });

        // Metin kutusunu temizle
        this.prompt = '';
      } catch (error) {
        console.error("Hata oluştu:", error);
        this.messages.push({ role: 'assistant', text: "Bir hata oluştu. Lütfen tekrar deneyin." });
      }
    }
  }
};
</script>

<style scoped>
/* Sohbet alanını stilize et */
.chat-container {
  margin-bottom: 20px;
  max-height: 400px;
  overflow-y: auto;
}

.message-container {
  margin-bottom: 15px;
}

.user-message {
  background-color: #d1f7d5;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
}

.assistant-message {
  background-color: #f1f0f0;
  padding: 10px;
  border-radius: 10px;
  margin: 5px 0;
}

textarea {
  margin-bottom: 10px;
  width: 100%;
}

button {
  margin-bottom: 20px;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
