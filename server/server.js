const express = require('express');
const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { Storage } = require('@google-cloud/storage');


const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();  

const API_KEY = process.env.API_KEY;  

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

const storage = new Storage();
const upload = multer({ dest: 'uploads/' });


app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.post('/upload', upload.single('file'), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).send('Dosya yüklenemedi.');
  }

  try {
    console.log(`Yüklenen dosya: ${file.originalname}`);
    res.send('Dosya başarıyla yüklendi!');
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).send('Sunucuda bir hata oluştu.');
  }
});


app.post('/generate', async (req, res) => {
  const prompt = req.body.prompt;

  try {
    const result = await model.generateContent({ text: prompt });
    res.json({ response: result.response.text() });
  } catch (error) {
    console.error('Hata:', error);
    res.status(500).send('İçerik oluşturulurken bir hata oluştu.');
  }
});

app.listen(PORT, () => {
  console.log(`Sunucu ${PORT} portunda çalışıyor.`);
});
