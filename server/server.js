import express from 'express';
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middlewares
app.use(cors({
  origin: '*', // Allows all origins, you can restrict this to your Vercel URL later
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Configure body parser to support large base64 uploads (like 10MB mp3 tracks)
app.use(express.json({ limit: '15mb' }));
app.use(express.urlencoded({ limit: '15mb', extended: true }));

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('FATAL ERROR: MONGODB_URI environment variable is missing.');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected successfully!');
    seedDefaultConfig();
  })
  .catch(err => console.error('MongoDB connection error:', err));

// Config Schema (Strict false to allow any key-values in weddingConfig structure)
const configSchema = new mongoose.Schema({
  key: { type: String, default: 'wedding_config', unique: true }
}, { strict: false });

const Config = mongoose.model('Config', configSchema);

// Helper to get default config from JSON file
const getDefaultConfig = () => {
  const configPath = path.resolve(__dirname, 'defaultConfig.json');
  return JSON.parse(fs.readFileSync(configPath, 'utf-8'));
};

// Helper to seed default configuration if collection is empty
async function seedDefaultConfig() {
  try {
    const count = await Config.countDocuments({ key: 'wedding_config' });
    if (count === 0) {
      const defaultConfig = getDefaultConfig();
      await Config.create({ ...defaultConfig, key: 'wedding_config' });
      console.log('Database successfully seeded with default defaultConfig.json!');
    }
  } catch (err) {
    console.error('Database seeding error:', err);
  }
}

// REST Endpoints
app.get('/api/config', async (req, res) => {
  try {
    let config = await Config.findOne({ key: 'wedding_config' });
    if (!config) {
      const defaultConfig = getDefaultConfig();
      config = await Config.create({ ...defaultConfig, key: 'wedding_config' });
    }
    res.json(config);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/save-config', async (req, res) => {
  try {
    const newConfig = req.body;
    
    // Cleanup fields to prevent database validation errors
    delete newConfig._id;
    delete newConfig.__v;
    newConfig.key = 'wedding_config';

    const updated = await Config.findOneAndUpdate(
      { key: 'wedding_config' },
      { $set: newConfig },
      { new: true, upsert: true }
    );
    res.json({ success: true, config: updated });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.post('/api/upload-file', async (req, res) => {
  try {
    const { filename, base64Data } = req.body;
    if (!base64Data) {
      return res.status(400).json({ success: false, error: 'File data (base64) is required' });
    }

    console.log(`Uploading file ${filename} to Cloudinary...`);

    // Upload payload directly to Cloudinary (resource_type auto resolves images vs audio/mp3 automatically)
    const result = await cloudinary.uploader.upload(base64Data, {
      public_id: filename.split('.')[0] + '_' + Date.now(),
      folder: 'wedding_invitation',
      resource_type: 'auto'
    });

    console.log(`Cloudinary upload success! URL: ${result.secure_url}`);
    res.json({ success: true, url: result.secure_url });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Root check endpoint
app.get('/', (req, res) => {
  res.send('Wedding Invitation API is running...');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
